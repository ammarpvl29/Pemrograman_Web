<!DOCTYPE html>
<html lang="en" data-theme="night">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- CSS -->
    <link rel="stylesheet" href="css/style.css">
    
    <!--- Tailwind CSS & Daisy UI CSS -->
    <link href="https://cdn.jsdelivr.net/npm/daisyui@2.18.0/dist/full.css" rel="stylesheet" type="text/css" />
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2/dist/tailwind.min.css" rel="stylesheet" type="text/css" />
    <link href='https://unpkg.com/boxicons@2.1.2/css/boxicons.min.css' rel='stylesheet'>

    <link rel="icon" type="image/svg+xml" href="res/favicon.ico">

    <!-- Add Firebase SDK scripts -->
    <script src="https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js"></script>

    <!-- Add type="module" to use ES modules -->
    <script type="module" src="js/signup.js"></script>

    <title>Sign Up - TO-DOIT</title>
</head>
<body class="min-h-screen bg-[#0B1120] flex items-center justify-center">
    <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
            <div class="bg-base-300 rounded-lg shadow-xl overflow-hidden">
                <div class="flex flex-col md:flex-row">
                    <!-- Left side - Signup Form -->
                    <div class="md:w-1/2 p-8">
                        <div class="text-center mb-8">
                            <h1 class="text-3xl font-bold text-primary">TO-DOIT</h1>
                            <p class="text-sm text-base-content/70 mt-2">Your Personal Productivity Hub</p>
                        </div>

                        <form class="space-y-6">
                            <p class="text-center mb-4">Create your account</p>

                    <!-- Form fields dengan validation -->
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Full Name</span>
                        </label>
                        <input 
                            type="text" 
                            id="fullName" 
                            placeholder="Enter your full name" 
                            class="input input-bordered input-primary"
                            required 
                            minlength="2"
                        />
                    </div>

                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Email</span>
                        </label>
                        <input 
                            type="email" 
                            id="email" 
                            placeholder="Enter your email" 
                            class="input input-bordered input-primary"
                            required 
                        />
                    </div>

                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Create Password</span>
                        </label>
                        <input 
                            type="password" 
                            id="password" 
                            placeholder="Enter your password" 
                            class="input input-bordered input-primary"
                            required 
                            minlength="6"
                            pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$"
                            title="Password must be at least 6 characters and contain letters and numbers"
                        />
                    </div>

                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Confirm Password</span>
                        </label>
                        <input 
                            type="password" 
                            id="confirmPassword" 
                            placeholder="Confirm your password" 
                            class="input input-bordered input-primary"
                            required 
                        />
                    </div>

                    <button type="submit" id="submit" class="btn btn-primary w-full">
                        <span class="normal-state">Sign Up</span>
                        <span class="loading-state hidden">
                            <span class="loading loading-spinner"></span>
                            Creating account...
                        </span>
                    </button>

                    <div id="message" class="mt-4 text-center hidden"></div>

                            <div id="message" class="mt-4 text-center hidden"></div>

                            <div class="text-center mt-4">
                                <p class="text-sm">Already have an account? 
                                    <a href="index.html" class="link link-primary">Login</a>
                                </p>
                            </div>
                        </form>
                    </div>

                    <!-- Right side - Info -->
                    <div class="md:w-1/2 bg-primary p-8 text-primary-content flex items-center">
                        <div>
                            <h2 class="text-2xl font-bold mb-4">Join TO-DOIT Today</h2>
                            <p class="mb-4">Start your journey to better productivity and habit building with these features:</p>
                            <ul class="space-y-2">
                                <li class="flex items-center">
                                    <i class='bx bx-check-circle mr-2'></i>
                                    <span>Create and manage custom to-do lists</span>
                                </li>
                                <li class="flex items-center">
                                    <i class='bx bx-check-circle mr-2'></i>
                                    <span>Track your daily habits</span>
                                </li>
                                <li class="flex items-center">
                                    <i class='bx bx-check-circle mr-2'></i>
                                    <span>Monitor your progress</span>
                                </li>
                                <li class="flex items-center">
                                    <i class='bx bx-check-circle mr-2'></i>
                                    <span>Free account forever</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</body>
</html>