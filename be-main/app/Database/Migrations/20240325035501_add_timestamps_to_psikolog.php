<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class AddTimestampsToPsikolog extends Migration
{
    public function up()
    {
        $this->forge->addColumn('psikolog', [
            'created_at' => [
                'type' => 'datetime',
                'null' => true,
            ],
            'updated_at' => [
                'type' => 'datetime',
                'null' => true,
            ],
        ]);
    }

    public function down()
    {
        $this->forge->dropColumn('psikolog', 'created_at');
        $this->forge->dropColumn('psikolog', 'updated_at');
    }
}
