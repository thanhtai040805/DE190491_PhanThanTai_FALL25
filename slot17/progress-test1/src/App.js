// App.js
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import AppRoutes from "./routes/AppRoutes"; // ⚠️ Import đúng đường dẫn đến AppRoutes.js
import { AuthProvider } from "./contexts/AuthContext";
import { PaymentProvider } from "./contexts/PaymentContext";

function App() {
  return (
    <AuthProvider>
      <PaymentProvider>
        <div>
          <AppRoutes /> {/* Hiển thị toàn bộ hệ thống route */}
        </div>
      </PaymentProvider>
    </AuthProvider>
  );
}

export default App;
