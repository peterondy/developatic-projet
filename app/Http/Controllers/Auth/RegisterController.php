<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use App\Models\User;
use Illuminate\Foundation\Auth\RegistersUsers;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

use DateTime;
use Illuminate\Support\Carbon;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Model;


use Illuminate\Support\Facades\DB;
class RegisterController extends Controller{

    use RegistersUsers;

    protected $redirectTo = RouteServiceProvider::HOME;


    public function __construct()
    {
        $this->middleware('guest');
    }

    protected function validator(array $data)
    {
        return Validator::make($data, [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            //'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);
    }
    public function show(){
        return view('auth.register');
    }
    protected function create(Request $request){
        /*return User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);*/
        
        $age = Carbon::parse($request->input('date_of_birth'))->diff(Carbon::now())->format('%y');
        if ($age<75 ||$age > 15){         
            User::create([
                'name' => $request['name'],
                'email' => $request['email'],
                'password' => Hash::make($request['password']),
                'date_of_birth' => $request['date_of_birth'],
                'user_type' => 'ADMIN',
                'age' => $age,
            ]);
            return redirect('/login');
        }else{
            return redirect('/dashboard');
        }
    }
    public function multiple(){
        //$age = Carbon::parse('24-12-2000')->diff(Carbon::now())->format('%y');
        /*User::create([
            'name' => 'Ramzi ben',
            'email' => 'admin@something.com',
            'password' => Hash::make('password'),
            'date_of_birth' => '2000-11-21',
            'user_type' => 'STANDARD',
            'age' => 22,
        ]);*/
        //$i=DB::select("SELECT LAST_INSERT_ID()");

        for ($i=1;$i<=1000;$i++){
            User::create([
                'name' => 'John Doe',
                'email' => 'user'.$i.'@user.com',
                'password' => Hash::make('123456789'),
                'date_of_birth' => '2000-11-21',
                'user_type' => 'STANDARD',
                'age' => 22,
            ]);
        }

        return redirect('/dashboard');
    }
}
