<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MasterSifatHuruf extends Model
{
    protected $fillable = ['name', 'description', 'tips_baca'];

    public function words()
    {
        return $this->belongsToMany(Word::class, 'word_sifat_hurufs', 'master_sifat_huruf_id', 'word_id')
                    ->withPivot('letter');
    }
}
