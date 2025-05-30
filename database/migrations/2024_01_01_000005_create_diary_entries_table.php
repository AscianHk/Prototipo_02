<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('diary_entries', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('book_id')->constrained()->onDelete('cascade');
            $table->integer('chapter');
            $table->text('text');
            $table->timestamps();

            $table->index(['user_id', 'book_id', 'chapter']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('diary_entries');
    }
};
