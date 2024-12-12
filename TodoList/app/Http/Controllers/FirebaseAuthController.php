<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Kreait\Laravel\Firebase\Facades\Firebase;
use Kreait\Firebase\Exception\AuthException;
use Kreait\Firebase\Exception\Auth\FailedToVerifyToken;
use Kreait\Firebase\Auth\UserRecord;
use Kreait\Firebase\Exception\Auth\RevokedIdToken;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class FirebaseAuthController extends Controller
{
    protected $auth;

    public function __construct()
    {
        $this->auth = Firebase::auth();
    }

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|min:6'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 400);
        }

        try {
            $userProperties = [
                'email' => $request->email,
                'emailVerified' => false,
                'password' => $request->password,
            ];

            $user = $this->auth->createUser($userProperties);

            return response()->json([
                'success' => true,
                'user' => $user
            ], 201);

        } catch (AuthException $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 400);
        }

        try {
            $signInResult = $this->auth->signInWithEmailAndPassword(
                $request->email, 
                $request->password
            );

            return response()->json([
                'success' => true,
                'user' => $signInResult->data()
            ]);

        } catch (AuthException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid credentials'
            ], 401);
        }
    }

    public function logout(Request $request)
    {
        try {
            // Require the user ID for token revocation
            $uid = $request->input('uid');
            
            if (!$uid) {
                return response()->json([
                    'success' => false,
                    'message' => 'User ID is required'
                ], 400);
            }

            // Revoke refresh tokens
            $this->auth->revokeRefreshTokens($uid);

            return response()->json([
                'success' => true,
                'message' => 'Tokens revoked successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function createCustomToken(Request $request)
    {
        try {
            // Generate a unique UID or use the user's email
            $uid = $request->input('uid') ?? Str::uuid()->toString();

            // Optional: Add custom claims
            $additionalClaims = [
                'role' => $request->input('role', 'user')
            ];

            $customToken = $this->auth->createCustomToken($uid, $additionalClaims);

            return response()->json([
                'success' => true,
                'token' => (string) $customToken
            ]);

        } catch (AuthException $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function verifyToken(Request $request)
    {
        $idTokenString = $request->input('token');

        try {
            $verifiedIdToken = $this->auth->verifyIdToken($idTokenString);

            // Extract claims
            $uid = $verifiedIdToken->claims()->get('sub');
            $user = $this->auth->getUser($uid);

            return response()->json([
                'success' => true,
                'uid' => $uid,
                'user' => [
                    'email' => $user->email,
                    'displayName' => $user->displayName
                ]
            ]);

        } catch (FailedToVerifyToken $e) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid token: ' . $e->getMessage()
            ], 401);
        }
    }

    public function verifyRevokedToken(Request $request)
    {
        $idTokenString = $request->input('token');

        try {
            // Verify token with revocation check
            $verifiedIdToken = $this->auth->verifyIdToken($idTokenString, true);

            return response()->json([
                'success' => true,
                'message' => 'Token is still valid'
            ]);

        } catch (RevokedIdToken $e) {
            return response()->json([
                'success' => false,
                'message' => 'Token has been revoked'
            ], 401);
        }
    }
}