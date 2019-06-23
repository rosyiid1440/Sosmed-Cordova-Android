$('#profile').hide();
$('#login').click(function () {
    var user = $.trim($("#username").val());
    var pass = $.trim($("#password").val());
    var loginString = "user=" + user + "&pass=" + pass + "&login=";
    $.ajax({
        type: "POST",
        crossDomain: true,
        cache: false,
        url: "https://kopaskode.com/tugasakhirwebphp/Login.php",
        data: loginString,
        success: function (data) {
            if (data == "success") {
                localStorage.loginstatus = "true";
                $('#pembungkuslogin').remove();

                $.post("https://kopaskode.com/tugasakhirwebphp/Profile.php", {
                        username: user
                    })
                    .done(function (data) {
                        $.each(data, function (i, item) {
                            $('#profile').show();
                            $('#namap').append(item.nama);
                            $('#nimp').append(item.nim);
                        })
                    });
                setInterval(function () {
                    $.post("https://kopaskode.com/tugasakhirwebphp/Following.php", {
                            username: user
                        })
                        .done(function (data) {

                            $('#angkafollowing').html(data);
                        });
                }, 1000);

                $('#getfollowing').click(function () {
                    $.post("https://kopaskode.com/tugasakhirwebphp/Getfollowing.php", {
                            username: user
                        })
                        .done(function (data) {
                            $('#profile').hide();
                            $('#showfollowing').html(data);

                            $('#backtoprofile').click(function () {
                                $('#getfollowingremove').remove();
                                $('#profile').show();
                            });
                        });
                });

                setInterval(function () {
                    $.post("https://kopaskode.com/tugasakhirwebphp/Follower.php", {
                            username: user
                        })
                        .done(function (data) {

                            $('#angkafollower').html(data);
                        });
                }, 1000);

                $('#getfollower').click(function () {
                    $.post("https://kopaskode.com/tugasakhirwebphp/Getfollower.php", {
                            username: user
                        })
                        .done(function (data) {
                            $('#profile').hide();
                            $('#showfollower').html(data);

                            $('#backtoprofile').click(function () {
                                $('#getfollowerremove').remove();
                                $('#profile').show();
                            });
                        });
                });


                $('#btneditprofile').click(function () {
                    $.post("https://kopaskode.com/tugasakhirwebphp/Editprofile.php", {
                            username: user
                        })
                        .done(function (data) {
                            $('#profile').hide();
                            $('#editprofile').append(data);

                            $('#updateprofile').click(function () {
                                var newusername = $('#newusername').val();
                                var newpassword = $('#newpassword').val();
                                var newnama = $('#newnama').val();
                                var newnim = $('#newnim').val();
                                $.post("https://kopaskode.com/tugasakhirwebphp/Updateprofile.php", {
                                        usernameawal: user,
                                        username: newusername,
                                        password: newpassword,
                                        nama: newnama,
                                        nim: newnim
                                    })
                                    .done(function (data) {
                                        if (data == 'success') {
                                            alert('Data berhasil di update');
                                            $('#profileremove').remove();
                                            $.post("https://kopaskode.com/tugasakhirwebphp/Profile.php", {
                                                    username: user
                                                })
                                                .done(function (data) {
                                                    $.each(data, function (i, item) {
                                                        $('#profile').show();
                                                        $('#namap').html(item.nama);
                                                        $('#nimp').html(item.nim);
                                                    })
                                                });
                                        } else {
                                            alert('data gagal di update');
                                        }
                                    })
                            });

                            $('#backtoprofile').click(function () {
                                $('#profileremove').remove();
                                $('#profile').show();
                            });
                        });
                });


                $('#post').click(function () {
                    var post = $('#isi').val();
                    $.post("https://kopaskode.com/tugasakhirwebphp/Inputpost.php", {
                            username: user,
                            posttulisan: post
                        })
                        .done(function (data) {
                            if (data == 'success') {
                                alert('data berhasil di input...');
                            } else {
                                alert('gagal di input...');
                            }
                        });
                });

                // setInterval(function () {
                $.post("https://kopaskode.com/tugasakhirwebphp/Getpostindividu.php", {
                        username: user
                    })
                    .done(function (data) {
                        $('#getpost').html(data);


                        $(document).on('click', '#deletepost', function () {
                            var id = $(this).data('touserid');
                            $.ajax({
                                type: 'POST',
                                url: 'https://kopaskode.com/tugasakhirwebphp/Delete.php',
                                data: {
                                    id: id
                                },
                                success: function (data) {
                                    if (data == 'success') {
                                        alert('data berhasil di hapus...');
                                    } else {
                                        alert('gagal di hapus...');
                                    }
                                }
                            });
                        });


                        $(document).on('click', '#editposting', function () {
                            $('#editremove').remove();
                            var id = $(this).data('touserid');
                            $.post("https://kopaskode.com/tugasakhirwebphp/Edit.php", {
                                    id: id
                                })
                                .done(function (data) {
                                    $('#editpost').append(data);
                                    $('#allstatus').hide();

                                    $('#update').click(function () {
                                        var id = $('#idupdate').val();
                                        var isiupdate = $('#isiupdate').val();
                                        $.post("https://kopaskode.com/tugasakhirwebphp/Update.php", {
                                                id: id,
                                                isiupdate: isiupdate
                                            })
                                            .done(function (data) {
                                                if (data == 'success') {
                                                    alert('data berhasil di update...');
                                                } else {
                                                    alert('gagal di update...');
                                                }
                                            });
                                    });
                                });
                        });



                    });
                // }, 1000);



                $('#beranda').click(function () {
                    loading('Please wait...');
                    closeLoading();
                    $.post("https://kopaskode.com/tugasakhirwebphp/Getpostall.php", {
                            username: user
                        })
                        .done(function (data) {
                            $('#getallpostremove').remove();
                            $('#getallpost').html(data);
                            $(document).on('click', '#btnfollow', function () {
                                var followuser = $(this).data('touser');
                                console.log(user + followuser);
                                $.post("https://kopaskode.com/tugasakhirwebphp/Follow.php", {
                                        username: user,
                                        follow: followuser
                                    })
                                    .done(function (data) {});
                            });

                            $(document).on('click', '#btnfollowing', function () {
                                var followinguser = $(this).data('touser');
                                console.log(user + followinguser);
                                $.post("https://kopaskode.com/tugasakhirwebphp/Unfollow.php", {
                                        username: user,
                                        follow: followinguser
                                    })
                                    .done(function (data) {});
                            });
                        });
                });

                $('#profilef').click(function () {
                    $('#getallpostremove').remove();
                    $('#editremove').remove();
                    $('#allstatus').show();
                    $.post("https://kopaskode.com/tugasakhirwebphp/Getpostindividu.php", {
                            username: user
                        })
                        .done(function (data) {
                            $('#getpost').html(data);
                        });
                });

                $.post("https://kopaskode.com/tugasakhirwebphp/Chat.php", {
                        username: user
                    })
                    .done(function (data) {
                        $('#tampilchat').html(data);

                        $(document).on('click', '#startchat', function () {
                            var to_username = $(this).data('tousername');
                            $.post("https://kopaskode.com/tugasakhirwebphp/Mulaichat.php", {
                                    ke_username: to_username,
                                    dari_username: user
                                })
                                .done(function (data) {
                                    $('#tampilchat').hide();
                                    $('#mulaiichat').html(data);
                                    $('#mulaiichat').show();

                                    $('#kirim').click(function () {
                                        var isipesan = $('#isipesan').val();
                                        $.post("https://kopaskode.com/tugasakhirwebphp/Insertchat.php", {
                                                ke_username: to_username,
                                                dari_username: user,
                                                isipesan: isipesan
                                            })
                                            .done(function (data) {
                                                console.log('berhasil');
                                            });
                                    });

                                    $('#chat').click(function () {
                                        $('#tampilchat').show();
                                        $('#mulaiichat').hide();
                                    });

                                    $('#back').click(function () {
                                        $('#tampilchat').show();
                                        $('#mulaiichat').hide();
                                    });
                                });
                        });


                    });


            } else if (data == "error") {
                alert('Login gagal !');
                closeLoading('login');
            }
        }
    });
});

$('#register').click(function () {
    var user = $.trim($("#username").val());
    var pass = $.trim($("#password").val());
    var nama = $('#nama').val();
    var nim = $('#nim').val();
    var loginString = "user=" + user + "&pass=" + pass + "&nama=" + nama + "&nim=" + nim + "&register=";
    $.ajax({
        type: "POST",
        crossDomain: true,
        cache: false,
        url: "https://kopaskode.com/tugasakhirwebphp/Register.php",
        data: loginString,
        success: function (data) {
            if (data == "success") {
                alert('Register berhasil ! ');
                localStorage.loginstatus = "true";
                window.location.href = "index.html";
            } else if (data == "error") {
                alert('Register gagal !');
                closeLoading('register');
            }
        }
    });
});