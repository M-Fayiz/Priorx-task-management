import { Spinner } from '@/components/spinner'
import { loginSchema } from '@/schema/authSchema'
import AuthService from '@/service/auth.service'
import { useAuthStore } from '@/store/auth.store'
import { ApiError } from '@/utils/axiosError.util'
import {
  ChevronsRightLeft,
  ListChecks,
  ListTodo,
  TrendingUp,
  Eye,
  EyeOff
} from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({
    email: "",
    password: "",
  })
  const [loginError,serLoginError]=useState<Record<string,string>>({})
   const [loading, setLoading] = useState(false)

   const navigate = useNavigate()
   const checkAuth = useAuthStore((s) => s.checkAuth)

     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    console.log(1234)
    const result = loginSchema.safeParse(form)
    if (!result.success) {
            const ERROR: { [key: string]: string } = {};
            const zodError = result.error;
            zodError.issues.forEach((err) => {
                if (err.path[0]) {
                ERROR[err.path[0] as string] = err.message;
                }
            });
            serLoginError(ERROR);
            return;
        }

    try {
      setLoading(true)
    console.log(1234)
      serLoginError({})
      await AuthService.login(form.email, form.password)
      await checkAuth()

      toast.success("Logged in successfully")
      navigate("/")

    } catch (error) {
      if(error instanceof ApiError){

        toast.error(error?.message || "Login failed")
      }
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="min-h-screen flex  from-gray-50 to-gray-100">
      
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
          <form className="space-y-5" onSubmit={handleSubmit}>

            {/* EMAIL */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Email
              </label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-xl border border-gray-300
                focus:border-black focus:ring-2 focus:ring-black/20
                outline-none transition-all"
              />
            </div>
            {loginError.email&&<p className='text-red-500'>{loginError.email}</p>}


            {/* PASSWORD */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Password
              </label>

              <div className="relative">
                <input
                 name="password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange}
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
              {loginError.password&&<p className='text-red-500'>{loginError.password}</p>}

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
      {loading&&<Spinner/>}
    </div>
  )
}
