/**
 * Created by 嬌嬌 on 2016/11/30.
 */
var sevice=angular.module("sevice",[]);
sevice.factory("localS",function () {
    return{
        getdata:function () {
            var data=localStorage.getItem("todo");
            if(data==null){
                return [
                    {
                        id:1,
                        color:colors[0],
                        title:"新列表",
                        list:[]
                    }
                ]
            }
            return JSON.parse(data)
        },
        savedata:function (data){
            localStorage.setItem("todo",JSON.stringify(data))
        }
    }
});