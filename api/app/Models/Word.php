<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Word extends Model
{
    protected $fillable = ['ayat_id', 'word_number', 'text_arabic', 'translation_id', 'audio_url'];

    public function ayat()
    {
        return $this->belongsTo(Ayat::class);
    }

    public function tajwids()
    {
        return $this->belongsToMany(MasterTajwid::class, 'word_tajwids', 'word_id', 'master_tajwid_id')
                    ->withPivot('fragment_arabic');
    }

    public function sifatHurufs()
    {
        return $this->belongsToMany(MasterSifatHuruf::class, 'word_sifat_hurufs', 'word_id', 'master_sifat_huruf_id')
                    ->withPivot('letter');
    }
}
