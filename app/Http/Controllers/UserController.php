<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Hash;



class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(){
        //
    }

    public function create(){
        //return view('auth.register');
    }

    public function store(Request $request){

        $string = url()->full();
        
        $name = Str::of($string)->between('name=', '&email=');
        $email = Str::of($string)->between('&email=', '&date_of_birth=');
        $date_of_birth = Str::of($string)->between('&date_of_birth=', '&password=');
        $password = Str::of($string)->between('&password=', '&re-password=');
        $re_password = Str::of($string)->between('&re-password=', '/');

        if($password != $re_password){
            return redirect('/dashboard');
        }
        $age = Carbon::parse($date_of_birth)->diff(Carbon::now())->format('%y');
        if ($age<75 ||$age > 15){         
            User::create([
                'name' => $name,
                'email' => $email,
                'password' => Hash::make($password),
                'date_of_birth' => $date_of_birth,
                'user_type' => 'Admin',
                'age' => $age,
            ]);
            return redirect('/dashboard');
        }else{
            return redirect('/dashboard');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id){
        $user = DB::select('select * from users where id = ? LIMIT 1', [$id]);
        return Inertia::render('Edit',[
            'user'=> $user
        ]);
    }

    public function update(Request $request, string $id){
        
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id){
        $user = DB::delete('delete from users where id = ?', [$id]);

        //redirect
        return redirect()->back()->with('success', 'success delete user');
    }
    
}
