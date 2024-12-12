<?php
namespace App\Services;

use Kreait\Firebase\Contract\Auth as FirebaseAuth;
use Kreait\Firebase\Contract\Database as FirebaseDatabase;
use Kreait\Firebase\Contract\Firestore as FirebaseFirestore;
use Kreait\Firebase\Auth\UserRecord;
use Kreait\Firebase\Exception\Auth\UserNotFound;
use Kreait\Firebase\Exception\AuthException;

class FirebaseService
{
    protected $auth;
    protected $database;
    protected $firestore;

    public function __construct(FirebaseAuth $auth, FirebaseDatabase $database, FirebaseFirestore $firestore)
    {
        $this->auth = $auth;
        $this->database = $database;
        $this->firestore = $firestore;
    }

    // Authentication Methods
    public function registerUser($email, $password): ?UserRecord
    {
        try {
            $userProperties = [
                'email' => $email,
                'emailVerified' => false,
                'password' => $password,
            ];
            return $this->auth->createUser($userProperties);
        } catch (AuthException $e) {
            throw $e;
        }
    }

    public function loginUser($email, $password)
    {
        try {
            return $this->auth->signInWithEmailAndPassword($email, $password);
        } catch (UserNotFound $e) {
            throw $e;
        }
    }

    // Firestore Methods
    public function addDocument($collection, $data)
    {
        return $this->firestore->database()->collection($collection)->add($data);
    }

    public function getDocuments($collection)
    {
        return $this->firestore->database()->collection($collection)->documents();
    }

    // Realtime Database Methods
    public function setData($path, $data)
    {
        return $this->database->getReference($path)->set($data);
    }

    public function getData($path)
    {
        return $this->database->getReference($path)->getValue();
    }
}