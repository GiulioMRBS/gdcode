<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Login page</title>
    </head>
    <body>
        <?php
        session_start();
        if (isset($_POST) && isset($_POST['userid']) && isset($_POST['pwd']) && $_POST['userid'] == "user1" && $_POST['pwd'] == "pwd1") {
            $_SESSION['user1'] = 'user1-active';
            ?>
            <h2>Welcome</h2>
            <div>
                <?php
                foreach ($_SESSION as $key => $value) {
                    echo 'key: ' . $key . ", value: " . $value . "<br/>";
                }
                ?>
            </div>
            <form action="." method="post">
                <input name="logout" value="poi" type="hidden">
                <button>Logout</button>
            </form>
            <?php
        } else {
            if (isset($_POST) && isset($_POST['logout']) && $_POST['logout'] == "poi") {
                session_destroy();
            }
            ?>
            <form action="." method="post">
                <fieldset>
                    <legend>Please log in</legend>
                    <div>
                        <input name="userid">
                        <input name="pwd" type="password">
                        <button>Log in</button>
                    </div>
                </fieldset>
            </form>
        <?php } ?>
    </body>
</html>
