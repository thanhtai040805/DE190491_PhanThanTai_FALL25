// App.js
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import AppRoutes from "./routes/AppRoutes"; // ⚠️ Import đúng đường dẫn đến AppRoutes.js
import { AuthProvider } from "./contexts/AuthContext";
import { PaymentProvider } from "./contexts/PaymentContext";
import { UserProvider } from "./contexts/UserContext";

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <PaymentProvider>
        <div>
          <AppRoutes /> {/* Hiển thị toàn bộ hệ thống route */}
        </div>
      </PaymentProvider>  
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
