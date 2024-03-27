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

$routes->post('api/adminlogin', 'AdminLogin::auth',['filter' =>'cors']);
$routes->get('api/getadmin', 'AdminLogin::getAdmin',['filter' =>'cors']);
$routes->post('api/adminlogout', 'AdminLogin::logout',['filter' =>'cors']);

$routes->get('api/admin', 'Admin::index', ['filter' => 'cors']);
$routes->post('api/admin', 'Admin::create', ['filter' => 'cors']);
$routes->get('api/admin/(:num)', 'Admin::show/$1', ['filter' => 'cors']);
$routes->post('api/admin/(:num)', 'Admin::update/$1', ['filter' => 'cors']);
$routes->get('api/admin/delete/(:num)', 'Admin::delete/$1', ['filter' => 'cors']);

$routes->get('api/partisipans', 'Partisipans::index', ['filter' => 'cors']);
$routes->post('api/partisipans', 'Partisipans::create', ['filter' => 'cors']);
$routes->get('api/partisipans/(:num)', 'Partisipans::show/$1', ['filter' => 'cors']);
$routes->post('api/partisipans/(:num)', 'Partisipans::update/$1', ['filter' => 'cors']);
$routes->get('api/partisipans/delete/(:num)', 'Partisipans::delete/$1', ['filter' => 'cors']);

$routes->get('api/dailyinsight', 'DailyInsight::index', ['filter' => 'cors']);
$routes->get('api/dailyinsight', 'DailyInsight::DailyinsightLanding', ['filter' => 'cors']);
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

// $routes->get('api/users', 'Users::index', ['filter' => 'cors']);
// $routes->post('api/users', 'Users::create', ['filter' => 'cors']);
// $routes->get('api/users/(:num)', 'Users::show/$1', ['filter' => 'cors']);
// $routes->post('api/users/(:num)', 'Users::update/$1', ['filter' => 'cors']);
// $routes->get('api/users/delete/(:num)', 'Users::delete/$1', ['filter' => 'cors']);


$routes->get('api/reviews', 'Review::index', ['filter' => 'cors']);
$routes->post('api/reviews', 'Review::create', ['filter' => 'cors']);
$routes->get('api/reviews/(:num)', 'Review::show/$1', ['filter' => 'cors']);
$routes->post('api/reviews/(:num)', 'Review::update/$1', ['filter' => 'cors']);
$routes->get('api/reviews/delete/(:num)', 'Review::delete/$1', ['filter' => 'cors']);

$routes->get('api/contact', 'Contact::index', ['filter' => 'cors']);
$routes->post('api/contact', 'Contact::create', ['filter' => 'cors']);
$routes->get('api/contact/(:num)', 'Contact::show/$1', ['filter' => 'cors']);
$routes->post('api/contact/(:num)', 'Contact::update/$1', ['filter' => 'cors']);
$routes->get('api/contact/delete/(:num)', 'Contact::delete/$1', ['filter' => 'cors']);