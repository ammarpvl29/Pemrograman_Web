<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Kreait\Firebase\Factory;
use Kreait\Firebase\Contract\Auth as FirebaseAuth;
use Kreait\Firebase\Contract\Database as FirebaseDatabase;
use Kreait\Firebase\Contract\Firestore as FirebaseFirestore;

class FirebaseServiceProvider extends ServiceProvider
{
    public function register()
    {
        $this->app->singleton('firebase', function ($app) {
            return (new Factory)
                ->withServiceAccount(config('firebase.credentials.path'));
        });

        $this->app->singleton(FirebaseAuth::class, function ($app) {
            return $app->make('firebase')->createAuth();
        });

        $this->app->singleton(FirebaseDatabase::class, function ($app) {
            return $app->make('firebase')->createDatabase();
        });

        $this->app->singleton(FirebaseFirestore::class, function ($app) {
            return $app->make('firebase')->createFirestore();
        });
    }

    public function boot()
    {
        //
    }
}