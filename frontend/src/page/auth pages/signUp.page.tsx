import { ChevronsRightLeft, ListChecks, ListTodo, TrendingUp } from 'lucide-react';
import  { useState } from 'react';
import type { IRegistration } from '../../types/auth.type';
import { signupSchema } from '../../schema/authSchema';
import AuthService from '@/service/auth.service'; 
import SimpleVerificationModal from '@/components/successModal';
import { Spinner } from '@/components/spinner';
import { Link } from 'react-router-dom';


export default function SignUpPage() {

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading,setLoading]=useState(false)
  const [email,setEmail]=useState('')
  const [showModal,setShowModal]=useState(false)
  const [formError,setFormErrors]=useState<Record<string,string>>({})
    const [registrationForm,setRegistrationForm]=useState<IRegistration>({
        name:'',
        email:'',
        password:'',
        confirmPassword:''
    })

    const onChangeInputs=(e:React.ChangeEvent<HTMLInputElement>)=>{
        const{name,value}=e.target
        setRegistrationForm(prv=>({...prv,[name]:value}))
    }

    const onSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()

        
        const result = signupSchema.safeParse(registrationForm)

        if (!result.success) {
            const ERROR: { [key: string]: string } = {};
            const zodError = result.error;
            zodError.issues.forEach((err) => {
                if (err.path[0]) {
                ERROR[err.path[0] as string] = err.message;
                }
            });
            setFormErrors(ERROR);
            return;
        }
        
        try {
          setLoading(true)
          const data = await AuthService.register(registrationForm.name,registrationForm.email,registrationForm.password)
          if(data){
            setEmail(data)
            setShowModal(true)
            setLoading(false)
          }
        } catch (error) {
       
          console.log(error)
          
        }finally {
  setLoading(false)
}
    }

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: '#F9F9F9' }}>
    
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="mb-8 ">
            <div className='flex gap-2 items-center mb-2'>
            <span>
                <ListTodo size={34} className='font-bold'/>
            </span>
            <h1 className="text-3xl font-extrabold font-mono " style={{ color: '#0F0F0F' }}>
              Priorix
            </h1>

            </div>
            <p className="text-lg" style={{ color: '#4D4D4D' }}>
              Create your account
            </p>
          </div>

          <form onSubmit={onSubmit} className="space-y-5">
            <div>
              <label 
                htmlFor="fullName" 
                className="block text-sm font-medium mb-1.5"
                style={{ color: '#4D4D4D' }}
              >
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="name"
                value={registrationForm.name}
                onChange={onChangeInputs}
                className="w-full px-4 py-2.5 rounded-lg border transition-colors outline-none"
                
                placeholder="Enter your full name"
              />
             {formError.name&&<p>{formError.name}</p>}

            </div>

            <div>
              <label 
                htmlFor="email" 
                className="block text-sm font-medium mb-1.5"
                style={{ color: '#4D4D4D' }}
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={registrationForm.email}
              onChange={onChangeInputs}
                className="w-full px-4 py-2.5 rounded-lg border transition-colors outline-none"
                
                onFocus={(e) => e.target.style.borderColor = '#4D4D4D'}
              
                placeholder="you@example.com"
              />
              {formError.email&&<p className='text-red-500'>{formError.email}</p>}
            </div>

            <div>
              <label 
                htmlFor="password" 
                className="block text-sm font-medium mb-1.5"
                style={{ color: '#4D4D4D' }}
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={registrationForm.password}
                  onChange={onChangeInputs}
                  className="w-full px-4 py-2.5 rounded-lg border transition-colors outline-none pr-12"
                 
                  onFocus={(e) => e.target.style.borderColor = '#4D4D4D'}
                
                  placeholder="At least 8 characters"
                />
                
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-sm"
                  style={{ color: '#8C8C8C' }}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
             {formError.password&&<p className='text-red-500'>{formError.password}</p>}
            </div>

            <div>
              <label 
                htmlFor="confirmPassword" 
                className="block text-sm font-medium mb-1.5"
                style={{ color: '#4D4D4D' }}
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={registrationForm.confirmPassword}
                 onChange={onChangeInputs}
                  className="w-full px-4 py-2.5 rounded-lg border transition-colors outline-none pr-12"
              
                  onFocus={(e) => e.target.style.borderColor = '#4D4D4D'}
                
                  placeholder="Re-enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-sm"
                  style={{ color: '#8C8C8C' }}
                >
                  {showConfirmPassword ? 'Hide' : 'Show'}
                </button>
              </div>
                {formError.confirmPassword&&<p className='text-red-500'>{formError.confirmPassword}</p>}
             
            </div>

            <button
  type="submit"
  disabled={loading}
  className={`w-full py-3 rounded-lg font-medium mt-6 
    flex items-center justify-center gap-2
    transition-all duration-300 ease-in-out
    ${loading 
      ? 'bg-gray-400 cursor-not-allowed' 
      : 'bg-black hover:bg-gray-800 active:scale-[0.98]'
    }
    text-white`}
>
  {loading && <Spinner variant="tech" size="small" />}
  <span>{loading ? 'Signing up...' : 'Sign Up'}</span>
</button>

          </form>

          <div className="mt-6 text-center">
            <p className="text-sm" style={{ color: '#8C8C8C' }}>
              Already have an account?{' '}
              <Link  
                to={'/auth/login'}
                className="font-medium transition-colors"
                style={{ color: '#0F0F0F' }}
              
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Feature highlight */}
      <div 
        className="hidden lg:flex lg:w-1/2 items-center justify-center p-12"
        style={{ backgroundColor: '#0F0F0F' }}
      >
        <div className="max-w-lg">
          <h2 className="text-4xl font-logo   mb-6" style={{ color: '#F9F9F9' }}>
            Organize everything.<br />Stay on top of it all.
          </h2>
          <p className="text-lg font-mono leading-relaxed mb-8" style={{ color: '#C7C7C7' }}>
            Priorix helps you manage tasks, and hit your deadlines without the stress.
          </p>
          <div className="space-y-4">
            {[
                { feature: 'Smart task prioritization', icon: TrendingUp },
                { feature: 'Real-time collaboration', icon: ChevronsRightLeft },
                { feature: 'Progress tracking', icon: ListChecks }
                ].map((item, i) => {
                const Icon = item.icon;

                return (
                    <div key={i} className="flex items-center gap-3">
                    <div
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: '#C7C7C7' }}
                    />
                    <Icon size={16} color="#F9F9F9" />
                    <span style={{ color: '#F9F9F9' }}>{item.feature}</span>
                    </div>
                )
                })
                }
          </div>
        </div>
      </div>
     <SimpleVerificationModal open={showModal} email={email}  onClose={() => setShowModal(false)} />
    </div>
  );
}