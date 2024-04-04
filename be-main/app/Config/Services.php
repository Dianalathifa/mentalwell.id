<?php

namespace Config;

use CodeIgniter\Config\Services as CoreServices;

class Services extends CoreServices
{
    public static function cors($config = null, bool $getShared = true)
    {
        if ($getShared) {
            return static::getSharedInstance('cors', $config);
        }

        return new \Fluent\Cors\ServiceCors($config);
    }
}
