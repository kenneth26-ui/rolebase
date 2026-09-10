import { signIn } from "@/auth";
import { FaGithub, FaCrown } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800/80 rounded-2xl p-8 shadow-xl">
        
        {/* Brand Header */}
        <div className="text-center mb-8 space-y-2">
          <div className="inline-flex p-3 rounded-xl bg-amber-500 text-slate-950 mb-2">
            <FaCrown className="w-5 h-5" />
          </div>
          <h1 className="text-2xl font-bold uppercase tracking-tight text-white">
            NICON <span className="text-amber-500">LUXURY</span>
          </h1>
          <p className="text-xs text-slate-400 leading-relaxed max-w-xs mx-auto">
            Sign in to access your executive reservations and account dashboard.
          </p>
        </div>

        {/* Authentication Buttons */}
        <div className="space-y-3">
          {/* Google Sign In */}
          <form
            action={async () => {
              "use server";
              await signIn("google");
            }}
          >
            <button
              type="submit"
              className="w-full py-3 px-4 bg-slate-950 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl border border-slate-800 transition-colors flex items-center justify-center gap-3 cursor-pointer"
            >
              <FcGoogle className="w-4 h-4" />
              <span>Continue with Google</span>
            </button>
          </form>

          {/* GitHub Sign In */}
          <form
            action={async () => {
              "use server";
              await signIn("github");
            }}
          >
            <button
              type="submit"
              className="w-full py-3 px-4 bg-slate-950 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl border border-slate-800 transition-colors flex items-center justify-center gap-3 cursor-pointer"
            >
              <FaGithub className="w-4 h-4 text-white" />
              <span>Continue with GitHub</span>
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}