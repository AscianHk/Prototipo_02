import AppLayout from "@/Layouts/AppLayout";
import { Head, Link } from "@inertiajs/react";

export default function Login() {
  return (
    <AppLayout title="Iniciar sesión">
      <Head title="Iniciar sesión" />
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-3xl font-bold mb-6 text-white">Iniciar sesión</h1>
        <form className="bg-white/10 p-8 rounded-lg shadow-lg w-full max-w-md">
          <div className="mb-4">
            <label className="block text-white mb-2">Email</label>
            <input type="email" className="w-full p-2 rounded bg-white/20 text-white" />
          </div>
          <div className="mb-6">
            <label className="block text-white mb-2">Contraseña</label>
            <input type="password" className="w-full p-2 rounded bg-white/20 text-white" />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">Entrar</button>
        </form>
        <p className="mt-4 text-white/70">
          ¿No tienes cuenta? <Link href="/register" className="text-blue-400 hover:underline">Regístrate</Link>
        </p>
      </div>
    </AppLayout>
  );
}
