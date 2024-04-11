import React, { Suspense, lazy } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./components/landing/App.css"; // Import file CSS utama Anda di sini

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AdminAuthProvider } from './components/admin/AdminAuthContext';
import { PartisipanAuthProvider } from './components/Partisipan/PartisipanAuthContext';

const Landing = lazy(() => import("./components/Home"));
const AboutUs = lazy(() => import("./components/landing/AboutUs"));
const Register = lazy(() => import("./components/Register"));
const Dashboard = lazy(() => import("./components/Dashboard"));
const Psikolog = lazy(() => import("./components/psikolog/Psikolog"));
const AddPsikolog = lazy(() => import("./components/psikolog/AddPsikolog"));
const EditPsikolog = lazy(() => import("./components/psikolog/EditPsikolog"));
const KategoriTest = lazy(() => import("./components/kategoritest/KategoriTest"));
const AddKategori = lazy(() => import("./components/kategoritest/AddKategori"));
const EditKategori = lazy(() => import("./components/kategoritest/EditKategori"));
const Kuisioner = lazy(() => import("./components/Kuisioner/Kuisioner"));
const AddKuisioner = lazy(() => import("./components/Kuisioner/AddKuisioner"));
const EditKuisioner = lazy(() => import("./components/Kuisioner/EditKuisioner"));
const Jawaban = lazy(() => import ("./components/jawaban/Jawaban"))
const PsikologList = lazy(() => import("./components/landing/PsikologList"));
const DailyInsight = lazy(() => import("./components/dailyinsight/DailyInsight"));
const AddDailyInsight = lazy(() => import("./components/dailyinsight/AddDailyInsight"));
const EditDailyInsight = lazy(() => import("./components/dailyinsight/EditDailyInsight"));
const DailyInsightUser = lazy(() => import("./components/dailyinsight/DailyInsightUser"));
const Admin = lazy(() => import("./components/admin/Admin"));
const AdminLogin = lazy(() => import("./components/admin/AdminLogin"));
const AdminRegister = lazy(() => import("./components/admin/AdminRegister"));
const AdminProfile = lazy(() => import("./components/admin/AdminProfile"));
const EditAdmin = lazy(() => import("./components/admin/EditAdmin"));
const Partisipan = lazy(() => import("./components/Partisipan/Partisipan"));
const PartisipanLogin = lazy(() => import("./components/Partisipan/PartisipanLogin"));
const PartisipanRegister = lazy(() => import("./components/Partisipan/PartisipanRegister"));
const PartisipanProfile = lazy(() => import("./components/Partisipan/PartisipanProfile"));
const EditPartisipan = lazy(() => import("./components/Partisipan/EditPartisipan"));
const SRQTest = lazy(() => import("./components/mentalTest/SRQTest"));
const SRQDetail = lazy(() => import("./components/mentalTest/SRQDetail"));
const MentalWellTest = lazy(() => import("./components/mentalTest/MentalWellTest"));


function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <AdminAuthProvider>
          <PartisipanAuthProvider>
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route path="/about-us" component={AboutUs} />
              <Route path="/register" component={Register} />
              <Route exact path="/dashboard" component={Dashboard} />
              <Route exact path="/srqtest-user" component={SRQTest} />
              <Route exact path="/srqdetail-user" component={SRQDetail} />
              <Route exact path="/mentalwelltest-user" component={MentalWellTest} />
              <Route exact path="/psikolog" component={Psikolog} />
              <Route exact path="/psikolog/add" component={AddPsikolog} />
              <Route exact path="/psikolog/edit/:id" component={EditPsikolog} />
              <Route exact path="/kategoritest" component={KategoriTest} />
              <Route exact path="/kategoritest/add" component={AddKategori} />
              <Route exact path="/kategoritest/edit/:id" component={EditKategori} />
              <Route exact path="/kuisioner" component={Kuisioner} />
              <Route exact path="/kuisioner/add" component={AddKuisioner} />
              <Route exact path="/kuisioner/edit/:id" component={EditKuisioner} />
              <Route exact path="/jawaban" component={Jawaban} />
              <Route exact path="/psikolog-list" component={PsikologList} />
              <Route exact path="/dailyinsight" component={DailyInsight} />
              <Route exact path="/dailyinsight/add" component={AddDailyInsight} />
              <Route exact path="/dailyinsight/edit/:id" component={EditDailyInsight} />
              <Route exact path="/dailyinsight-user" component={DailyInsightUser} />
              <Route exact path="/admin" component={Admin} />
              <Route exact path="/admin-register" component={AdminRegister} />
              <Route exact path="/admin-login" component={AdminLogin} />
              <Route exact path="/admin/profile" component={AdminProfile} />
              <Route exact path="/admin/edit/:id" component={EditAdmin} />
              <Route exact path="/partisipan" component={Partisipan} />
              <Route exact path="/partisipan-register" component={PartisipanRegister} />
              <Route exact path="/partisipan-login" component={PartisipanLogin} />
              <Route exact path="/partisipan/profile" component={PartisipanProfile} />
              <Route exact path="/partisipan/edit/:id" component={EditPartisipan} />
            </Switch>
          </PartisipanAuthProvider>
        </AdminAuthProvider>
      </Suspense>
    </Router>
  );
}

export default App;
