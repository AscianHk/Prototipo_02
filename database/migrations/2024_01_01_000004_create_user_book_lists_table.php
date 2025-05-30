<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('user_book_lists', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('book_id')->constrained()->onDelete('cascade');
            $table->enum('list_type', ['favorites', 'want_to_read', 'currently_reading', 'read', 'liked']);
            $table->timestamps();

            $table->unique(['user_id', 'book_id', 'list_type']);
            $table->index(['user_id', 'list_type']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('user_book_lists');
    }
};
