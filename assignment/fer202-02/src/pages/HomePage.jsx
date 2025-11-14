// src/pages/HomePage.jsx
import { useNavigate } from "react-router-dom";
import { Container, Button , Row , Col} from "react-bootstrap";
import NavigationHeader from "../components/NavigationHeader.jsx";
import ExpenseManagement from "../components/ExpenseManagement.jsx";
import AddExpense from "../components/AddExpense.jsx";
import FilterBar from "../components/FilterBar.jsx";
import TotalAmount from "../components/TotalAmount.jsx";
import Footer from "../components/Footer.jsx";

const HomePage = () => {
  return (
    <>
      {/* 1. Header (Navigation Bar) */}
      <NavigationHeader />

      <div className="">
        <Row>
          <Col md="4 pt-4">
            <TotalAmount/>
          </Col>
          <Col md="8 pt-4">
            <FilterBar/>
          </Col>
        </Row>
      </div>

      <div className="">
        <Row>
          <Col md="4">
            <AddExpense />
          </Col>
          <Col md="8 pt-4">
            <ExpenseManagement />
          </Col>
        </Row>
      </div>

      <Footer />
    </>
  );
};

export default HomePage; // 👈 default export
