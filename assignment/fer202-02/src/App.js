// App.js
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import AppRoutes from "./routes/AppRoutes"; // ⚠️ Import đúng đường dẫn đến AppRoutes.js
import { AuthProvider } from "./contexts/AuthContext";
import { ExpenseProvider } from "./contexts/ExpenseContext";

function App() {
  return (
    <AuthProvider>
      <ExpenseProvider>
        <div>
          <AppRoutes /> {/* Hiển thị toàn bộ hệ thống route */}
        </div>
      </ExpenseProvider>
    </AuthProvider>
  );
}

export default App;
