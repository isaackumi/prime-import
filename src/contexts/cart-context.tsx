'use client'

import React, { createContext, useContext, useReducer, useEffect } from 'react'

interface CartItem {
    id: string
    name: string
    price: number
    quantity: number
    image?: string
    storeId: string
    storeName: string
}

interface CartState {
    items: CartItem[]
    total: number
    itemCount: number
}

type CartAction =
    | { type: 'ADD_ITEM'; payload: CartItem }
    | { type: 'REMOVE_ITEM'; payload: string }
    | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
    | { type: 'CLEAR_CART' }
    | { type: 'LOAD_CART'; payload: CartItem[] }

const cartReducer = (state: CartState, action: CartAction): CartState => {
    switch (action.type) {
        case 'ADD_ITEM': {
            const existingItem = state.items.find(item => item.id === action.payload.id)

            if (existingItem) {
                return {
                    ...state,
                    items: state.items.map(item =>
                        item.id === action.payload.id
                            ? { ...item, quantity: item.quantity + action.payload.quantity }
                            : item
                    ),
                }
            } else {
                return {
                    ...state,
                    items: [...state.items, action.payload],
                }
            }
        }

        case 'REMOVE_ITEM': {
            return {
                ...state,
                items: state.items.filter(item => item.id !== action.payload),
            }
        }

        case 'UPDATE_QUANTITY': {
            return {
                ...state,
                items: state.items.map(item =>
                    item.id === action.payload.id
                        ? { ...item, quantity: action.payload.quantity }
                        : item
                ),
            }
        }

        case 'CLEAR_CART': {
            return {
                ...state,
                items: [],
            }
        }

        case 'LOAD_CART': {
            return {
                ...state,
                items: action.payload,
            }
        }

        default:
            return state
    }
}

const calculateTotals = (items: CartItem[]) => {
    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)
    return { total, itemCount }
}

interface CartContextType {
    state: CartState
    addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void
    removeItem: (id: string) => void
    updateQuantity: (id: string, quantity: number) => void
    clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(cartReducer, {
        items: [],
        total: 0,
        itemCount: 0,
    })

    // Calculate totals whenever items change
    useEffect(() => {
        const { total, itemCount } = calculateTotals(state.items)
        dispatch({ type: 'LOAD_CART', payload: state.items })
    }, [state.items])

    // Load cart from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('cart')
        if (savedCart) {
            try {
                const items = JSON.parse(savedCart)
                dispatch({ type: 'LOAD_CART', payload: items })
            } catch (error) {
                console.error('Failed to load cart from localStorage:', error)
            }
        }
    }, [])

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(state.items))
    }, [state.items])

    const addItem = (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => {
        dispatch({
            type: 'ADD_ITEM',
            payload: { ...item, quantity: item.quantity || 1 },
        })
    }

    const removeItem = (id: string) => {
        dispatch({ type: 'REMOVE_ITEM', payload: id })
    }

    const updateQuantity = (id: string, quantity: number) => {
        if (quantity <= 0) {
            removeItem(id)
        } else {
            dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } })
        }
    }

    const clearCart = () => {
        dispatch({ type: 'CLEAR_CART' })
    }

    const cartState = {
        ...state,
        total: calculateTotals(state.items).total,
        itemCount: calculateTotals(state.items).itemCount,
    }

    return (
        <CartContext.Provider
            value={{
                state: cartState,
                addItem,
                removeItem,
                updateQuantity,
                clearCart,
            }}
        >
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const context = useContext(CartContext)
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider')
    }
    return context
} 