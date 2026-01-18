import {
  ChevronsRightLeft,
  ListChecks,
  ListTodo,
  TrendingUp,
  Eye,
  EyeOff
} from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-50 to-gray-100">
      
      {/* LEFT SECTION */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 transition-all">

          {/* Logo */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <ListTodo size={36} className="text-black" />
              <h1 className="text-3xl font-extrabold tracking-tight">
                Priorix
              </h1>
            </div>
            <p className="text-gray-500">
              Create your account
            </p>
          </div>

          {/* FORM */}
          <form className="space-y-5">

            {/* EMAIL */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-xl border border-gray-300
                focus:border-black focus:ring-2 focus:ring-black/20
                outline-none transition-all"
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="At least 8 characters"
                  className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-300
                  focus:border-black focus:ring-2 focus:ring-black/20
                  outline-none transition-all"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2
                  text-gray-500 hover:text-black transition"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="w-full py-3 rounded-xl font-semibold
              bg-black text-white
              hover:bg-gray-900 hover:-translate-y-0.5
              active:translate-y-0
              transition-all duration-200 shadow-lg"
            >
              Sign In
            </button>
          </form>

          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Already have an account?{' '}
              <Link to={'/auth/signup'} className="font-semibold text-black cursor-pointer hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>

     
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center bg-black p-12">
        <div className="max-w-lg text-white">

          <h2 className="text-4xl font-bold leading-tight mb-6">
            Organize everything. <br />
            Stay on top of it all.
          </h2>

          <p className="text-gray-300 text-lg mb-8">
            Priorix helps you manage tasks, collaborate in real-time,
            and hit deadlines without stress.
          </p>

          <div className="space-y-4">
            {[
              { feature: 'Smart task prioritization', icon: TrendingUp },
              { feature: 'Real-time collaboration', icon: ChevronsRightLeft },
              { feature: 'Progress tracking', icon: ListChecks }
            ].map((item, i) => {
              const Icon = item.icon
              return (
                <div
                  key={i}
                  className="flex items-center gap-3 text-gray-200
                  hover:translate-x-1 transition-all"
                >
                  <Icon size={18} />
                  <span>{item.feature}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
