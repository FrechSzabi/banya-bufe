import { createContext, useEffect, useMemo, useReducer } from 'react';
import { createCartLine } from '../utils/cartLine';

const STORAGE_KEY = 'banya-bufe:cart';
const MAX_QUANTITY = 99;

export const CartContext = createContext(null);

const ACTIONS = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_LINE: 'REMOVE_LINE',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR: 'CLEAR',
  OPEN: 'OPEN',
  CLOSE: 'CLOSE',
};

const clampQuantity = (quantity) => Math.min(Math.max(quantity, 0), MAX_QUANTITY);

function cartReducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD_ITEM: {
      const { line } = action;
      const existing = state.lines.find((candidate) => candidate.lineId === line.lineId);
      const lines = existing
        ? state.lines.map((candidate) =>
            candidate.lineId === line.lineId
              ? { ...candidate, quantity: clampQuantity(candidate.quantity + line.quantity) }
              : candidate,
          )
        : [...state.lines, line];
      return { ...state, lines };
    }

    case ACTIONS.UPDATE_QUANTITY: {
      const quantity = clampQuantity(action.quantity);
      const lines =
        quantity === 0
          ? state.lines.filter((line) => line.lineId !== action.lineId)
          : state.lines.map((line) => (line.lineId === action.lineId ? { ...line, quantity } : line));
      return { ...state, lines };
    }

    case ACTIONS.REMOVE_LINE:
      return { ...state, lines: state.lines.filter((line) => line.lineId !== action.lineId) };

    case ACTIONS.CLEAR:
      return { ...state, lines: [] };

    case ACTIONS.OPEN:
      return { ...state, isOpen: true };

    case ACTIONS.CLOSE:
      return { ...state, isOpen: false };

    default:
      throw new Error(`Ismeretlen kosár művelet: ${action.type}`);
  }
}

const loadInitialState = () => {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return { lines: Array.isArray(stored) ? stored : [], isOpen: false };
  } catch {
    return { lines: [], isOpen: false };
  }
};

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, undefined, loadInitialState);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.lines));
    } catch {
      // A tárolás nem kritikus (pl. privát böngészés) – csendben kihagyjuk.
    }
  }, [state.lines]);

  const value = useMemo(() => {
    const itemCount = state.lines.reduce((sum, line) => sum + line.quantity, 0);
    const subtotal = state.lines.reduce((sum, line) => sum + line.unitPrice * line.quantity, 0);

    return {
      lines: state.lines,
      isOpen: state.isOpen,
      itemCount,
      subtotal,
      addItem: (item, options, quantity = 1) =>
        dispatch({ type: ACTIONS.ADD_ITEM, line: createCartLine(item, options, quantity) }),
      updateQuantity: (lineId, quantity) => dispatch({ type: ACTIONS.UPDATE_QUANTITY, lineId, quantity }),
      removeLine: (lineId) => dispatch({ type: ACTIONS.REMOVE_LINE, lineId }),
      clearCart: () => dispatch({ type: ACTIONS.CLEAR }),
      openCart: () => dispatch({ type: ACTIONS.OPEN }),
      closeCart: () => dispatch({ type: ACTIONS.CLOSE }),
    };
  }, [state]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
