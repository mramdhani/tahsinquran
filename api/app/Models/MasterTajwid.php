<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MasterTajwid extends Model
{
    protected $fillable = ['name', 'color_code', 'description'];

    public function words()
    {
        return $this->belongsToMany(Word::class, 'word_tajwids', 'master_tajwid_id', 'word_id')
                    ->withPivot('fragment_arabic');
    }
}
