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

$routes->get('api/dailyinsight', 'DailyInsight::index', ['filter' => 'cors']);
$routes->get('api/dailyinsight', 'DailyInsight::DailyInsightLanding', ['filter' => 'cors']);
$routes->post('api/dailyinsight', 'DailyInsight::create', ['filter' => 'cors']);
$routes->get('api/dailyinsight/(:num)', 'DailyInsight::show/$1', ['filter' => 'cors']);
$routes->post('api/dailyinsight/(:num)', 'DailyInsight::update/$1', ['filter' => 'cors']);
$routes->get('api/dailyinsight/delete/(:num)', 'DailyInsight::delete/$1', ['filter' => 'cors']);

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


$routes->get('api/kuisioner', 'Kuisioner::index', ['filter' => 'cors']); // Endpoint untuk menampilkan semua data kuisioner
$routes->get('api/kuisioner/(:num)', 'Kuisioner::show/$1', ['filter' => 'cors']); // Endpoint untuk menampilkan detail kuisioner berdasarkan ID
$routes->post('api/kuisioner', 'Kuisioner::create', ['filter' => 'cors']); // Endpoint untuk menambahkan data kuisioner baru
$routes->post('api/kuisioner/(:num)', 'Kuisioner::update/$1', ['filter' => 'cors']); // Endpoint untuk mengupdate data kuisioner berdasarkan ID
$routes->delete('api/kuisioner/(:num)', 'Kuisioner::delete/$1', ['filter' => 'cors']); // Endpoint untuk menghapus data kuisioner berdasarkan ID

$routes->post('api/save-answer', 'SRQTest::saveAnswer', ['filter' => 'cors']);
