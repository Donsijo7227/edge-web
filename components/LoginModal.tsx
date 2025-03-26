// 'use client'

// import { useState } from 'react'
// import { useRouter } from 'next/navigation'
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"

// type LoginModalProps = {
//   children: React.ReactNode; // This will be the trigger button
// }

// export default function LoginModal({ children }: LoginModalProps) {
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [isLoading, setIsLoading] = useState(false)
//   const [error, setError] = useState('')
//   const [isOpen, setIsOpen] = useState(false)
//   const router = useRouter()

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setIsLoading(true)
//     setError('')
    
//     try {
//       const res = await fetch('/api/auth/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email, password }),
//       })
      
//       const data = await res.json()
      
//       if (!res.ok) {
//         throw new Error(data.message || 'Login failed')
//       }
 
      
//       // Close the modal
//       setIsOpen(false)
      
//       // Reset form
//       setEmail('')
//       setPassword('')

//       // Redirect based on role (admin or member)
//       if (data.user.role === 'admin') {
//         router.push('/dashboard')
//       } else {
//         router.push('/member/dashboard')
//       }
//     } catch (error: any) {
//       setError(error.message)
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <Dialog open={isOpen} onOpenChange={setIsOpen}>
//       <DialogTrigger asChild>
//         {children}
//       </DialogTrigger>
//       <DialogContent className="sm:max-w-[425px] border-edge-green-dark">
//         <DialogHeader>
//           <DialogTitle className="text-center text-2xl font-heading text-edge-green-dark">
//             EDGE Garden Login
//           </DialogTitle>
//           <DialogDescription className="text-center">
//             Enter your credentials to access your account
//           </DialogDescription>
//         </DialogHeader>
        
//         {error && (
//           <div className="mb-4 rounded bg-red-100 p-3 text-red-800">
//             {error}
//           </div>
//         )}
        
//         <form onSubmit={handleSubmit} className="space-y-4 py-4">
//           <div className="space-y-2">
//             <label htmlFor="email" className="block text-sm font-medium text-edge-green-dark">
//               Email
//             </label>
//             <Input
//               id="email"
//               type="email"
//               placeholder="you@example.com"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               className="border-edge-green-dark focus-visible:ring-edge-green-primary"
//             />
//           </div>
          
//           <div className="space-y-2">
//             <label htmlFor="password" className="block text-sm font-medium text-edge-green-dark">
//               Password
//             </label>
//             <Input
//               id="password"
//               type="password"
//               placeholder="••••••••"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               className="border-edge-green-dark focus-visible:ring-edge-green-primary"
//             />
//           </div>
          
//           <Button 
//             type="submit" 
//             disabled={isLoading}
//             className="w-full bg-edge-green-dark text-white hover:bg-edge-green-primary hover:text-edge-green-dark"
//           >
//             {isLoading ? 'Logging in...' : 'Log in'}
//           </Button>
//         </form>
//       </DialogContent>
//     </Dialog>
//   )
// }
