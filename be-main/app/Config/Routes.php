<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
// $routes->get('/', 'Home::index');
// $routes->resource('users');
$routes->post('api/login', 'Login::auth',['filter' =>'cors']);
$routes->get('api/getuser', 'Login::getUser',['filter' =>'cors']);
$routes->post('api/logout', 'Login::logout',['filter' =>'cors']);

// $routes->post('api/adminlogin', 'AdminLogin::auth',['filter' =>'cors']);
// $routes->get('api/getadmin', 'AdminLogin::getAdmin',['filter' =>'cors']);
// $routes->post('api/adminlogout', 'AdminLogin::logout',['filter' =>'cors']);

$routes->get('api/admin', 'Admin::index', ['filter' => 'cors']);
$routes->post('api/admin', 'Admin::create', ['filter' => 'cors']);
$routes->get('api/admin/(:num)', 'Admin::show/$1', ['filter' => 'cors']);
$routes->post('api/admin/update/(:num)', 'Admin::update/$1', ['filter' => 'cors']);
$routes->get('api/admin/delete/(:num)', 'Admin::delete/$1', ['filter' => 'cors']);
$routes->match(['post', 'options'], 'admin/login', 'AdminLogin::login');
$routes->match(['post', 'options'], 'admin/register', 'AdminRegister::register');

$routes->get('api/partisipan', 'Partisipan::index', ['filter' => 'cors']);
$routes->post('api/partisipan', 'Partisipan::create', ['filter' => 'cors']);
$routes->get('api/partisipan/(:num)', 'Partisipan::show/$1', ['filter' => 'cors']);
$routes->post('api/partisipan/update/(:num)', 'Partisipan::update/$1', ['filter' => 'cors']);
$routes->get('api/partisipan/delete/(:num)', 'Partisipan::delete/$1', ['filter' => 'cors']);
$routes->match(['post', 'options'], 'partisipan/login', 'PartisipanLogin::login');
$routes->match(['post', 'options'], 'partisipan/register', 'PartisipanRegister::register');

$routes->get('api/daily_insight', 'DailyInsight::index', ['filter' => 'cors']);
$routes->get('api/daily_insight', 'DailyInsight::DailyInsightLanding', ['filter' => 'cors']);
$routes->post('api/daily_insight', 'DailyInsight::create', ['filter' => 'cors']);
$routes->get('api/daily_insight/(:num)', 'DailyInsight::show/$1', ['filter' => 'cors']);
$routes->post('api/daily_insight/update/(:num)', 'DailyInsight::update/$1', ['filter' => 'cors']);
$routes->get('api/daily_insight/delete/(:num)', 'DailyInsight::delete/$1', ['filter' => 'cors']);

$routes->get('api/psikolog', 'Psikolog::index', ['filter' => 'cors']);
$routes->get('api/psikolog', 'Psikolog::PsikologLanding', ['filter' => 'cors']);
$routes->post('api/psikolog', 'Psikolog::create', ['filter' => 'cors']);
$routes->get('api/psikolog/(:num)', 'Psikolog::show/$1', ['filter' => 'cors']);
$routes->post('api/psikolog/(:num)', 'Psikolog::update/$1', ['filter' => 'cors']);
$routes->get('api/psikolog/delete/(:num)', 'Psikolog::delete/$1', ['filter' => 'cors']);

$routes->get('api/kategori_test', 'KategoriTest::index', ['filter' => 'cors']);
$routes->get('api/kategori_test/(:num)', 'KategoriTest::show/$1', ['filter' => 'cors']);
$routes->post('api/kategori_test', 'KategoriTest::create', ['filter' => 'cors']);
$routes->post('api/kategori_test/(:num)', 'KategoriTest::update/$1', ['filter' => 'cors']);
$routes->get('api/kategori_test/delete/(:num)', 'KategoriTest::delete/$1', ['filter' => 'cors']);
$routes->get('kategori_test', 'KategoriTest::getAll'); // Endpoint untuk mendapatkan semua data kategori test
$routes->get('api/kategori_test/dass42', 'KategoriTest::getDass42', ['filter' => 'cors']);

$routes->get('api/kuisioner', 'Kuisioner::index', ['filter' => 'cors']); // Endpoint untuk menampilkan semua data kuisioner
$routes->get('api/kuisioner/(:num)', 'Kuisioner::show/$1', ['filter' => 'cors']); // Endpoint untuk menampilkan detail kuisioner berdasarkan ID
$routes->post('api/kuisioner', 'Kuisioner::create', ['filter' => 'cors']); // Endpoint untuk menambahkan data kuisioner baru
$routes->post('api/kuisioner/(:num)', 'Kuisioner::update/$1', ['filter' => 'cors']); // Endpoint untuk mengupdate data kuisioner berdasarkan ID
$routes->delete('api/kuisioner/(:num)', 'Kuisioner::delete/$1', ['filter' => 'cors']); // Endpoint untuk menghapus data kuisioner berdasarkan ID
$routes->get('api/kuisioner/kategori/(:num)', 'Kuisioner::getByKategoriId/$1', ['filter' => 'cors']);

$routes->get('api/intervensi', 'Intervensi::index', ['filter' => 'cors']); // Endpoint untuk menampilkan semua data intervensi
$routes->get('api/intervensi/(:num)', 'Intervensi::show/$1', ['filter' => 'cors']); // Endpoint untuk menampilkan detail intervensi berdasarkan ID
$routes->post('api/intervensi', 'Intervensi::create', ['filter' => 'cors']); // Endpoint untuk menambahkan data intervensi baru
$routes->post('api/intervensi/(:num)', 'Intervensi::update/$1', ['filter' => 'cors']); // Endpoint untuk mengupdate data intervensi berdasarkan ID
$routes->delete('api/intervensi/(:num)', 'Intervensi::delete/$1', ['filter' => 'cors']); // Endpoint untuk menghapus data intervensi berdasarkan ID
$routes->get('api/intervensi/kategori/(:num)', 'Intervensi::byKategoriId/$1', ['filter' => 'cors']);
$routes->get('api/intervensi/image/(:num)', 'Intervensi::byImageId/$1', ['filter' => 'cors']);
$routes->get('api/intervensi/deskripsi/(:num)', 'Intervensi::byDeskripsiId/$1', ['filter' => 'cors']);

$routes->get('api/jawaban', 'Jawaban::index', ['filter' => 'cors']); // Endpoint untuk menampilkan semua data jawaban
$routes->get('api/jawaban/(:num)', 'Jawaban::show/$1', ['filter' => 'cors']); // Endpoint untuk menampilkan detail jawaban berdasarkan ID
$routes->post('api/jawaban', 'Jawaban::create', ['filter' => 'cors']); // Endpoint untuk menambahkan data jawaban baru
$routes->post('api/jawaban/(:num)', 'Jawaban::update/$1', ['filter' => 'cors']); // Endpoint untuk mengupdate data jawaban berdasarkan ID
$routes->delete('api/jawaban/(:num)', 'Jawaban::delete/$1', ['filter' => 'cors']); // Endpoint untuk menghapus data jawaban berdasarkan ID

$routes->post('api/jawaban-srq', 'JawabanSRQController::saveAnswer', ['filter' => 'cors']);
$routes->get('api/jawaban-srq', 'JawabanSRQController::getAnswers');

$routes->post('api/dass-stress', 'DassStress::saveAnswer', ['filter' => 'cors']);
$routes->get('api/dass-stress', ' DassStress::getAnswers');
$routes->get('api/dass-stress/(:segment)', 'DassStress::getAnswerByIdPartisipan/$1');


$routes->post('api/dass-cemas', 'DassCemas::saveAnswer', ['filter' => 'cors']);
$routes->get('api/dass-cemas', ' DassCemas::getAnswers');
$routes->get('api/dass-cemas/(:segment)', 'DassCemas::getAnswerByIdPartisipan/$1');


$routes->post('api/dass-depresi', 'DassDepresi::saveAnswer', ['filter' => 'cors']);
$routes->get('api/dass-depresi', 'DassDepresi::getAnswers');
$routes->get('api/dass-depresi/(:segment)', 'DassDepresi::getAnswerByIdPartisipan/$1');


$routes->post('api/suicide', 'Suicide::saveAnswer', ['filter' => 'cors']);
$routes->get('api/suicide', ' Suicide::getAnswers');
$routes->get('api/suicide/(:segment)', 'Suicide::getAnswerByIdPartisipan/$1');

$routes->group('api', ['namespace' => 'App\Controllers'], function ($routes) {
    $routes->get('jadwal-tidur', 'JadwalTidur::index');
    $routes->post('jadwal-tidur', 'JadwalTidur::create');
    $routes->put('jadwal-tidur/(:num)', 'JadwalTidur::update/$1');
    $routes->delete('jadwal-tidur/(:num)', 'JadwalTidur::delete/$1');
    $routes->get('jadwal-tidur/(:num)', 'JadwalTidur::getByPartisipan/$1');

});

$routes->group('api', ['namespace' => 'App\Controllers'], function ($routes) {
    $routes->get('jadwal-olahraga', 'JadwalOlahraga::index');
    $routes->post('jadwal-olahraga', 'JadwalOlahraga::create');
    $routes->put('jadwal-olahraga/(:num)', 'JadwalOlahraga::update/$1');
    $routes->delete('jadwal-olahraga/(:num)', 'JadwalOlahraga::delete/$1');
    $routes->get('jadwal-olahraga/(:num)', 'JadwalOlahraga::getByPartisipan/$1');

});

$routes->group('api', ['namespace' => 'App\Controllers'], function ($routes) {
    $routes->get('kegiatan', 'JadwalKegiatan::index');
    $routes->post('kegiatan', 'JadwalKegiatan::create');
    $routes->put('kegiatan/(:num)', 'JadwalKegiatan::update/$1');
    $routes->delete('kegiatan/(:num)', 'JadwalKegiatan::delete/$1');
    $routes->get('kegiatan/(:num)', 'JadwalKegiatan::getByPartisipan/$1');

});

$routes->group('api', ['namespace' => 'App\Controllers'], function ($routes) {
    $routes->get('tujuan', 'JadwalTujuan::index');
    $routes->post('tujuan', 'JadwalTujuan::create');
    $routes->put('tujuan/(:num)', 'JadwalTujuan::update/$1');
    $routes->delete('tujuan/(:num)', 'JadwalTujuan::delete/$1');
    $routes->get('tujuan/(:num)', 'JadwalTujuan::getByPartisipan/$1');

});

$routes->group('api', ['namespace' => 'App\Controllers'], function ($routes) {
    $routes->get('pola-makan', 'PolaMakan::index');
    $routes->post('pola-makan', 'PolaMakan::create');
    $routes->put('pola-makan/(:num)', 'PolaMakan::update/$1');
    $routes->delete('pola-makan/(:num)', 'PolaMakan::delete/$1');
    $routes->get('pola-makan/(:num)', 'PolaMakan::getByPartisipan/$1');

});

$routes->group('api/mindfulness', ['namespace' => 'App\Controllers'], function($routes) {
    $routes->post('save-daily-status', 'MindfulnessController::saveDailyStatus');
    $routes->post('save-meditation-experience', 'MindfulnessController::saveMeditationExperience');
    $routes->get('daily-statuses/(:num)', 'MindfulnessController::getDailyStatuses/$1');
    $routes->get('meditation-experiences', 'MindfulnessController::getMeditationExperiences');
});

$routes->group('api', ['namespace' => 'App\Controllers'], function($routes) {
    $routes->get('jawaban-intervensi', 'JawabanIntervensi::index');
    $routes->post('jawaban-intervensi', 'JawabanIntervensi::create');
    $routes->put('jawaban-intervensi/(:num)', 'JawabanIntervensi::update/$1');
    $routes->delete('jawaban-intervensi/(:num)', 'JawabanIntervensi::delete/$1');
    $routes->get('jawaban-intervensi/(:num)', 'JawabanIntervensi::show/$1');
});

