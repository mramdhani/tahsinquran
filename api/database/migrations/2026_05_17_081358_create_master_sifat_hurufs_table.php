<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('master_sifat_hurufs', function (Blueprint $table) {
            $table->id();
            $table->string('code')->unique();
            $table->string('name');
            $table->string('name_arabic')->nullable();
            $table->string('category')->nullable();       // Berlawanan | Tanpa Lawan
            $table->string('opposite')->nullable();        // code lawan sifat ini
            $table->text('description')->nullable();
            $table->text('letters_arabic')->nullable();    // huruf-huruf yang termasuk
            $table->string('color_code')->default('#607D8B');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('master_sifat_hurufs');
    }
};
