<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLibrosTable extends Migration
{
    public function up()
{
    Schema::create('libros', function (Blueprint $table) {
        $table->id();
        $table->string('google_books_id')->unique()->nullable();
        $table->string('google_id')->unique()->nullable();
        $table->string('title')->index();
        $table->string('author')->nullable()->index();
        $table->string('publisher')->nullable();
        $table->string('published_date')->nullable();
        $table->text('description')->nullable();
        $table->integer('page_count')->nullable();
        $table->string('imagen_url')->nullable();
        $table->json('authors')->nullable();
        $table->json('categories')->nullable();
        $table->float('average_rating')->nullable();
        $table->string('language')->nullable();
        $table->timestamps();
    });
}


    public function down()
    {
        Schema::dropIfExists('libros');
    }
}