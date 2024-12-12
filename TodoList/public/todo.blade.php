<!DOCTYPE html>
<html lang="en" data-theme="night">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- CSS -->
    <link rel="stylesheet" href="css/style.css">
    <link href="https://cdn.jsdelivr.net/npm/daisyui@2.18.0/dist/full.css" rel="stylesheet" type="text/css" />
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2/dist/tailwind.min.css" rel="stylesheet" type="text/css" />
    <link href='https://unpkg.com/boxicons@2.1.2/css/boxicons.min.css' rel='stylesheet'>

    <link rel="icon" type="image/svg+xml" href="res/favicon.ico">
    <script type="module" src="js/signout.js"></script>
    <script type="module" src="js/profile.js"></script>

    <title>TO-DOIT - Todo List</title>
</head>
<body class="min-h-screen bg-[#0B1120]">
    <!-- Drawer container -->
    <div class="drawer">
        <input id="drawer-sidebar" type="checkbox" class="drawer-toggle" />
        
        <!-- Page content -->
        <div class="drawer-content flex flex-col">
            <!-- Navbar -->
            <div class="w-full navbar bg-base-300 fixed top-0 z-50">
                <div class="flex-none">
                    <label for="drawer-sidebar" class="btn btn-ghost drawer-button">
                        <i class='bx bx-menu text-xl'></i>
                    </label>
                </div>
                <div class="flex-1">
                    <span class="text-xl font-bold">TO-DOIT</span>
                </div>
                <div class="flex-none">
                    <div class="dropdown dropdown-end">
                        <label tabindex="0" class="btn btn-ghost">
                            <i class='bx bxs-palette'></i>
                        </label>
                        <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                            <li class="theme-item" theme="cupcake"><a>cupcake</a></li>
                            <li class="theme-item" theme="dark"><a>dark</a></li>
                            <li class="theme-item" theme="light"><a>light</a></li>
                            <li class="theme-item" theme="bumblebee"><a>bumblebee</a></li>
                            <li class="theme-item" theme="synthwave"><a>synthwave</a></li>
                            <li class="theme-item" theme="halloween"><a>halloween</a></li>
                            <li class="theme-item" theme="fantasy"><a>fantasy</a></li>
                            <li class="theme-item" theme="dracula"><a>dracula</a></li>
                            <li class="theme-item" theme="aqua"><a>aqua</a></li>
                            <li class="theme-item" theme="luxury"><a>luxury</a></li>
                            <li class="theme-item" theme="night"><a>night</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- Main content with padding for navbar -->
            <div class="pt-20 px-4">
                <!-- Navigation buttons -->
                <div class="text-center mb-8">
                    <div class="flex justify-center items-center gap-4">
                        <a href="todo.html" class="btn btn-primary">TODO LIST</a>
                        <a href="habits.html" class="btn btn-ghost">HABITS</a>
                    </div>
                </div>

                <!-- Todo content -->
                <div class="max-w-3xl mx-auto bg-base-300 rounded-lg p-6">
                    <h2 class="text-2xl font-bold mb-6">Todo List</h2>
                    <div class="alert-message"></div>
                    
                    <!-- Add todo form -->
                    <div class="input-section flex gap-4 mb-6">
                        <input type="text" placeholder="Add a new task..." class="input input-bordered input-secondary flex-grow" />
                        <input type="date" class="input input-bordered input-secondary schedule-date" />
                        <button class="btn btn-secondary">
                            <i class="bx bx-plus bx-sm"></i>
                        </button>
                    </div>

                    <!-- Todo list table -->
                    <div class="overflow-x-auto">
                        <table class="table w-full">
                            <thead>
                                <tr>
                                    <th>TASK</th>
                                    <th>DUE DATE</th>
                                    <th>STATUS</th>
                                    <th>ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody class="todos-list-body">
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <!-- Footer -->
            <footer class="footer footer-center p-4 text-base-content mt-auto">
                <div>
                    <p>Made with ❤️ by <a href="https://github.com/ammarpvl29" target="_blank"><b>WebPro Team 3</b></a></p>
                </div>
            </footer>
        </div>

        <!-- Drawer sidebar -->
        <div class="drawer-side">
            <label for="drawer-sidebar" class="drawer-overlay"></label>
            <div class="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                <!-- Profile section -->
                <div class="flex flex-col items-center gap-4 mb-8 pt-4">
                    <div class="avatar placeholder">
                        <div class="bg-neutral-focus text-neutral-content rounded-full w-24">
                            <span class="text-3xl" id="profileInitials">U</span>
                        </div>
                    </div>

                    <div class="flex items-center gap-2">
                        <span id="userDisplay" class="text-sm"></span>
                        <span id="emailDisplay" class="text-sm text-gray-500"></span>
                    </div> 
                </div>

                <!-- Sidebar menu -->
                <ul>
                    <li><a href="todo.html" class="active">Todo List</a></li>
                    <li><a href="habits.html">Habits</a></li>
                    <li><a href="settings.html">Settings</a></li>
                </ul>

                <!-- Sign out button -->
                <div class="mt-auto">
                    <button id="signOutBtn" class="btn btn-error btn-block mt-4">
                        <i class='bx bx-log-out mr-2'></i> Sign Out
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- JS -->
    <script type="module" src="js/main.js"></script>
</body>
</html>