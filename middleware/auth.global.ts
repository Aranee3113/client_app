// middleware/auth.global.ts
import { decodeJwt } from "jose";

export default defineNuxtRouteMiddleware((to) => {
  const token = useCookie("token").value;

  // 🔒 ถ้าไม่มี token และพยายามเข้าหน้า member/admin → redirect ไป login
  if (!token && (to.path.startsWith("/admin") || to.path.startsWith("/member"))) {
    return navigateTo("/login");
  }

  // ถ้ามี token → ตรวจระดับสิทธิ์
  if (token) {
    const { is_admin } = decodeJwt(token);

    // 🧩 ห้ามสมาชิกหรือ guest เข้า admin
    if (to.path.startsWith("/admin") && is_admin !== 1) {
      return navigateTo("/403");
    }

    // 🧩 ห้าม guest (is_admin = null) เข้า member
    if (to.path.startsWith("/member") && (is_admin === null || is_admin === undefined)) {
      return navigateTo("/login");
    }
  }
});
