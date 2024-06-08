import React, { Suspense, lazy } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./components/landing/App.css"; // Import file CSS utama Anda di sini

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AdminAuthProvider } from './components/admin/AdminAuthContext';
import { PartisipanAuthProvider } from './components/Partisipan/PartisipanAuthContext';
import HasilSRQ from "./components/jawaban/HasilSRQ";
import Mindfulness from "./components/Intervensi/IntervensiMindfulness";

const Landing = lazy(() => import("./components/Home"));
const AboutUs = lazy(() => import("./components/landing/AboutUs"));
const DashboardAdmin = lazy(() => import("./components/Dashboard"));
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
const JawabanSRQ = lazy(() => import ("./components/jawaban/JawabanSRQ"))
const PsikologList = lazy(() => import("./components/psikolog/PsikologList"));
const DailyInsight = lazy(() => import("./components/dailyinsight/DailyInsight"));
const AddDailyInsight = lazy(() => import("./components/dailyinsight/AddDailyInsight"));
const EditDailyInsight = lazy(() => import("./components/dailyinsight/EditDailyInsight"));
const DailyInsightUser = lazy(() => import("./components/dailyinsight/DailyInsightUser"));
const DailyInsightDetail = lazy(() => import("./components/dailyinsight/DailyInsightDetail"));
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
const DASS42Cemas = lazy(() => import ("./components/mentalTest/DASS42Cemas"));
const DASS42Depresi = lazy(() => import ("./components/mentalTest/DASS42Depresi"));
const DASS42Stress = lazy(() => import ("./components/mentalTest/DASS42Stress"));
const DASS42Detail = lazy(() => import ("./components/mentalTest/DASS42Detail"));
// const KategoriDASS42 = lazy(() => import ("./components/mentalTest/KategoriDass42"));
const SRQTest = lazy(() => import("./components/mentalTest/SRQTest"));
const SRQDetail = lazy(() => import("./components/mentalTest/SRQDetail"));
const Suicide = lazy(() => import("./components/mentalTest/Suicide"));
const SuicideTest = lazy(() => import("./components/mentalTest/SuicideTest"));
const MentalWellTest = lazy(() => import("./components/mentalTest/MentalWellTest"));
const PostTest = lazy(() => import("./components/mentalTest/PostTest"));

const EditIntervensi =lazy(() =>  import ("./components/Intervensi/EditIntervensi"));
const IntervensiAdmin = lazy (() => import ("./components/Intervensi/Intervensi"));
const IntervensiDetail = lazy (() => import ("./components/Intervensi/IntervensiDetail"));
const AddIntervensi = lazy (() => import ("./components/Intervensi/AddIntervensi"));
const IntervensiTerapi = lazy (() => import ("./components/Intervensi/depresiRingan/IntervensiTerapi"));
const DetailTerapi = lazy (() => import ("./components/Intervensi/depresiRingan/DetailTerapi"));
const Intervensi30Days = lazy (() => import ("./components/Intervensi/30dayChallenge/Intervensi30Days"));
const ChallengeDetail = lazy (() => import ("./components/Intervensi/30dayChallenge/30DaysDetail"));
const IntervensiStressCoping = lazy (() => import ("./components/Intervensi/stressCoping/IntervensiStressCoping"));
const IntervensiTeknikGrounding = lazy (() => import ("./components/Intervensi/teknik54321/IntervensiTeknikGrounding"));
const TeknikGroundingDetail = lazy (() => import ("./components/Intervensi/teknik54321/Detail"));
const TeknikGrounding = lazy (() => import ("./components/Intervensi/teknik54321/54321"));
const IntervensiMindfulness = lazy (() => import ("./components/Intervensi/IntervensiMindfulness"));

const Cemas = lazy (() => import ("./components/Intervensi/Cemas"));
const Stress = lazy (() => import ("./components/Intervensi/Stress"));
const Depresi = lazy (() => import ("./components/Intervensi/Depresi"));

const PenjelasanCBT = lazy (() => import ("./components/Intervensi/depresiSedang/Penjelasan"));
const MBSR = lazy (() => import ("./components/Intervensi/mindfulness/MBSR"));
const LatihanMindfulness = lazy (() => import ("./components/Intervensi/mindfulness/LatihanMindfulness"));
const BodyScan = lazy (() => import ("./components/Intervensi/mindfulness/BodyScan"));
const MBSRImplementation = lazy (() => import ("./components/Intervensi/mindfulness/MBSRImplementation"));
const FormStress = lazy (() => import ("./components/Intervensi/30dayChallenge/FormStress"));

const HasilKlasifikasi = lazy (() => import ("./components/Partisipan/HasilKlasifikasi"));
const HasilDASSDepresi = lazy (() => import ("./components/Partisipan/HasilDassDepresi"));
const HasilDASSCemas = lazy (() => import ("./components/Partisipan/HasilDassCemas"));
const HasilDASSStress = lazy (() => import ("./components/Partisipan/HasilDassStress"));
const HasilSuicide = lazy (() => import ("./components/Partisipan/HasilSuicide"));
const HasilPostTest = lazy (() => import ("./components/Partisipan/HasilPostTest"));

const JadwalTidur = lazy (() => import ("./components/Intervensi/activity/JadwalTidur"));
const JadwalOlahraga = lazy (() => import ("./components/Intervensi/activity/JadwalOlahraga"));
const JadwalKegiatan = lazy (() => import ("./components/Intervensi/activity/JadwalKegiatan"));
const JadwalTujuan = lazy (() => import ("./components/Intervensi/activity/JadwalTujuan"));
const PolaMakan = lazy (() => import ("./components/Intervensi/activity/PolaMakan"));
const Mindfulness1 = lazy (() => import ("./components/Intervensi/mindfulness/Mindfulness1"));
const Mindfulness2 = lazy (() => import ("./components/Intervensi/mindfulness/Mindfulness2"));
const Mindfulness3 = lazy (() => import ("./components/Intervensi/mindfulness/Mindfulness3"));
const Mindfulness4 = lazy (() => import ("./components/Intervensi/mindfulness/Mindfulness4"));

const Nothing2mnt = lazy (() => import ("./components/Intervensi/stressCoping/Nothing2Mnt"));
const Grateful = lazy (() => import ("./components/Intervensi/stressCoping/Grateful"));
const Coloring = lazy (() => import ("./components/Intervensi/stressCoping/Coloring"));
const Puzzle = lazy (() => import ("./components/Intervensi/stressCoping/Puzzle"));
const VideoStressAdmin = lazy (() => import ("./components/admin/VideoStress"));
const StressDetail = lazy (() => import ("./components/Intervensi/stressCoping/StressDetail"));

const CBT = lazy (() => import ("./components/Intervensi/depresiSedang/CBT"));
const CBTPikiran = lazy (() => import ("./components/Intervensi/depresiSedang/CBTPikiran"));
const CBTPerasaan = lazy (() => import ("./components/Intervensi/depresiSedang/CBTPerasaan"));
const CBTPercayaDiri = lazy (() => import ("./components/Intervensi/depresiSedang/CBTPercayaDiri"));

const CBTSession = lazy (() => import ("./components/Intervensi/depresiSedang/CbtSession"));

const DailyTask = lazy (() => import ("./components/Intervensi/depresiSedang/DailyTask"));
const DetailDailyTask = lazy (() => import ("./components/Intervensi/depresiSedang/DetailDailyTask"));

const CBTSessionAdmin = lazy(() => import("./components/admin/CBTSession"));
const DailyTaskAdmin = lazy(() => import("./components/admin/DailyTask"));

const CemasRinganChecklist = lazy(() => import("./components/Intervensi/teknik54321/CemasDailyChecklist"));
const StressRinganChecklist = lazy(() => import("./components/Intervensi/stressCoping/StressDailyChecklist"));
const DepresiRinganChecklist = lazy(() => import("./components/Intervensi/activity/DepresiDailyChecklist"));

const VoiceOverAdmin = lazy (() => import ("./components/admin/VoiceOvers"));





function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <AdminAuthProvider>
          <PartisipanAuthProvider>
            <Switch>
               {/* HOME */}
              <Route exact path="/" component={Landing} />
              <Route path="/about-us" component={AboutUs} />

               {/* KATEGORI TEST */}
              <Route exact path="/dass42cemas-user" component={DASS42Cemas} />
              <Route exact path="/dass42depresi-user" component={DASS42Depresi} />
              <Route exact path="/dass42stress-user" component={DASS42Stress} />
              <Route exact path="/dass42detail-user" component={DASS42Detail} />
              <Route exact path="/suicide-user" component={Suicide} />
              <Route exact path="/suicidetest-user" component={SuicideTest} />
              {/* <Route exact path="/dass42kategori-user" component={KategoriDASS42} /> */}
              <Route exact path="/srqtest-user" component={SRQTest} />
              <Route exact path="/post-test" component={PostTest} />
              <Route exact path="/srqdetail-user" component={SRQDetail} />
              <Route exact path="/mentalwelltest-user" component={MentalWellTest} />
              <Route exact path="/hasil-klasifikasi-srq" component={HasilKlasifikasi} />
              <Route exact path="/hasil-klasifikasi-dass-depresi" component={HasilDASSDepresi} />
              <Route exact path="/hasil-klasifikasi-dass-cemas" component={HasilDASSCemas} />
              <Route exact path="/hasil-klasifikasi-dass-stress" component={HasilDASSStress} />
              <Route exact path="/hasil-test-suicide" component={HasilSuicide} />
              <Route exact path="/hasil-post-test" component={HasilPostTest} />

               {/* INTERVENSI */}
              <Route exact path="/intervensidetail-user" component={IntervensiDetail} />
              <Route exact path="/intervensiterapi-user" component={IntervensiTerapi} />
              <Route exact path="/detail-terapi" component={DetailTerapi} />
              <Route exact path="/intervensimindfulness-user" component={IntervensiMindfulness} />
              <Route exact path="/intervensi30days-user" component={Intervensi30Days} />
              <Route exact path="/30daysdetail-user" component={ChallengeDetail} />
              <Route exact path="/intervensi-stresscoping-user" component={IntervensiStressCoping} />
              <Route exact path="/intervensigrounding-user" component={IntervensiTeknikGrounding} />
              <Route exact path="/groundingdetail-user" component={TeknikGroundingDetail} />
              <Route exact path="/Intervensi54321-user" component={TeknikGrounding} />
              <Route exact path="/cemas-daily-checklist" component={CemasRinganChecklist} />
              <Route exact path="/coloring" component={Coloring} />
              <Route exact path="/puzzle&game" component={Puzzle} />
              <Route exact path="/stress-detail" component={StressDetail} />

              <Route exact path="/penjelasan-cbt" component={PenjelasanCBT} />
              <Route exact path="/cbt" component={CBT} />
              <Route exact path="/cbt-pikiran" component={CBTPikiran} />
              <Route exact path="/cbt-perasaan" component={CBTPerasaan} />
              <Route exact path="/cbt-percaya-diri" component={CBTPercayaDiri} />

              <Route exact path="/intro-mbsr" component={MBSR} />
              <Route exact path="/mindfulness-exercise" component={LatihanMindfulness} />
              <Route exact path="/body-scan-breathing" component={BodyScan} />
              <Route exact path="/mbsr-implementation" component={MBSRImplementation} />
              <Route exact path="/formstress-user/:id" component={FormStress} />
              <Route exact path="/jadwal-tidur" component={JadwalTidur} />
              <Route exact path="/jadwal-olahraga" component={JadwalOlahraga} />
              <Route exact path="/jadwal-kegiatan" component={JadwalKegiatan} />
              <Route exact path="/jadwal-tujuan" component={JadwalTujuan} />
              <Route exact path="/pola-makan" component={PolaMakan} />
              <Route exact path="/depresi-daily-checklist" component={DepresiRinganChecklist} />
              <Route exact path="/mindfulness-1" component={Mindfulness1} />
              <Route exact path="/mindfulness-2" component={Mindfulness2} />
              <Route exact path="/mindfulness-3" component={Mindfulness3} />
              <Route exact path="/mindfulness-4" component={Mindfulness4} />

              <Route exact path="/stress-coping-nothing-2minutes" component={Nothing2mnt} />
              <Route exact path="/stress-coping-grateful" component={Grateful} />
              <Route exact path="/stress-daily-checklist" component={StressRinganChecklist} />

              <Route exact path="/cbt-session" component={CBTSession} />

              <Route exact path="/daily-task" component={DailyTask} />
              <Route exact path="/daily-task-detail/:id" component={DetailDailyTask} />

              <Route exact path="/cemas-user" component={Cemas} />
              <Route exact path="/stress-user" component={Stress} />
              <Route exact path="/depresi-user" component={Depresi} />

               {/* PSIKOLOG */}
              <Route exact path="/psikolog" component={Psikolog} />
              <Route exact path="/psikolog/add" component={AddPsikolog} />
              <Route exact path="/psikolog/edit/:id" component={EditPsikolog} />

              {/* KUISIONER */}
              <Route exact path="/kuisioner" component={Kuisioner} />
              <Route exact path="/kuisioner/add" component={AddKuisioner} />
              <Route exact path="/kuisioner/edit/:id" component={EditKuisioner} />
              <Route exact path="/jawaban" component={Jawaban} />
              <Route exact path="/srq" component={JawabanSRQ} />
              <Route exact path="/hasil-srq" component={HasilSRQ} />
              <Route exact path="/psikolog-list" component={PsikologList} />
              
              {/* DAILY INSIGHT */}
              <Route exact path="/dailyinsight" component={DailyInsight} />
              <Route exact path="/dailyinsight/add" component={AddDailyInsight} />
              <Route exact path="/dailyinsight/edit/:id" component={EditDailyInsight} />
              <Route exact path="/dailyinsight-user" component={DailyInsightUser} />
              <Route exact path="/dailyinsight-detail-user/:id" component={DailyInsightDetail} />

               {/* PARTISIPAN */}
              <Route exact path="/partisipan" component={Partisipan} />
              <Route exact path="/partisipan-register" component={PartisipanRegister} />
              <Route exact path="/partisipan-login" component={PartisipanLogin} />
              <Route exact path="/partisipan-profile" component={PartisipanProfile} />
              <Route exact path="/partisipan/edit/:id" component={EditPartisipan} />

              {/* ADMIN */}
              <Route exact path="/dashboard" component={DashboardAdmin} />
              <Route exact path="/admin" component={Admin} />
              <Route exact path="/admin-register" component={AdminRegister} />
              <Route exact path="/admin-login" component={AdminLogin} />
              <Route exact path="/admin/profile" component={AdminProfile} />
              <Route exact path="/admin/edit/:id" component={EditAdmin} />

              <Route exact path="/intervensi" component={IntervensiAdmin} />
              <Route exact path="/intervensi/add" component={AddIntervensi} />
              <Route exact path="/intervensi/edit/:id" component={EditIntervensi} />

              <Route exact path="/kategoritest" component={KategoriTest} />
              <Route exact path="/kategoritest/add" component={AddKategori} />
              <Route exact path="/kategoritest/edit/:id" component={EditKategori} />

              <Route exact path="/video-stress-admin" component={VideoStressAdmin} />
              <Route exact path="/cbt-session-admin" component={CBTSessionAdmin} />
              <Route exact path="/cbt-daily-task-admin" component={DailyTaskAdmin} />
              <Route exact path="/voice-over-admin" component={VoiceOverAdmin} />


            </Switch>
          </PartisipanAuthProvider>
        </AdminAuthProvider>
      </Suspense>
    </Router>
  );
}

export default App;
