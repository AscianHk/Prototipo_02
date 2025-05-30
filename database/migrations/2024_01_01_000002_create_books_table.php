<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('books', function (Blueprint $table) {
            $table->id();
            $table->string('google_id')->unique();
            $table->string('title');
            $table->string('author');
            $table->text('description')->nullable();
            $table->string('publisher')->nullable();
            $table->string('published_date')->nullable();
            $table->integer('page_count')->default(0);
            $table->string('language', 10)->default('en');
            $table->string('image_url')->nullable();
            $table->json('categories')->nullable();
            $table->decimal('average_rating', 3, 2)->default(0);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('books');
    }
};
