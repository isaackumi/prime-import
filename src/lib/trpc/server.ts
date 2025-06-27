import { initTRPC } from '@trpc/server'
import { type CreateNextContextOptions } from '@trpc/server/adapters/next'
import { z } from 'zod'

export const createContext = async (opts: CreateNextContextOptions) => {
    return {
        req: opts.req,
        res: opts.res,
    }
}

const t = initTRPC.context<typeof createContext>().create()

export const router = t.router
export const publicProcedure = t.procedure

// Middleware to check if user is authenticated
const isAuthed = t.middleware(({ ctx, next }) => {
    // For now, we'll handle auth in individual procedures
    return next({
        ctx: {
            ...ctx,
        },
    })
})

export const protectedProcedure = t.procedure.use(isAuthed) 