<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Ayat extends Model
{
    protected $fillable = ['surah_id', 'ayat_number', 'text_arabic', 'translation_id'];

    public function surah()
    {
        return $this->belongsTo(Surah::class);
    }

    public function words()
    {
        return $this->hasMany(Word::class);
    }
}
