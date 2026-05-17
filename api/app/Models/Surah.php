<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Surah extends Model
{
    protected $fillable = ['name_arabic', 'name_latin', 'translation_id', 'total_ayats'];

    public function ayats()
    {
        return $this->hasMany(Ayat::class);
    }
}
