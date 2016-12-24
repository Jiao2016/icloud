// var todo=[
//     {
//         id:1,
//         title:'列表1',
//         color:'#c970e3',
//         list:[
//             {
//                 title:66666,
//                 done:true
//             },
//             {
//                 title:666666,
//                 done:false
//             },
//             {
//                 title:66666666,
//                 done:true
//             }]
//     },
//     {
//         id:2,
//         title:'列表2',
//         color:'#6ddc31',
//         list:[
//             {
//                 title:11111111,
//                 done:true
//             },{
//                 title:11111111,
//                 done:true
//             },{
//                 title:11111111,
//                 done:true
//             },
//             {
//                 title:11,
//                 done:false
//             },
//             {
//                 title:11,
//                 done:true
//             }]
//     }
// ];
var todo=[];
var colors=['#c970e3','#6ddc31','#40abf8','#f2cb00','#a0855e','#f82469','#f99500'];
var ctrl=angular.module('ctrl',["sevice"]);
    // ctrl.factory("localS",function () {
    //     return{
    //         getdata:function () {
    //         var data=localStorage.getItem("todo");
    //         if(data==null){
    //             return [
    //                 {
    //                     id:1,
    //                     color:colors[0],
    //                     title:"新列表",
    //                     list:[]
    //                 }
    //             ]
    //         }
    //         return JSON.parse(data)
    //     },
    //         savedata:function (data){
    //         localStorage.setItem("todo",JSON.stringify(data))
    //         }
    //     }
    //
    // });
ctrl.controller('c',function($scope,$filter,localS){
    // $scope.todo=todo;
    $scope.todo=localS.getdata();
    $scope.index=0;
    $scope.colors=colors;
    $scope.Setshow=false;
    $scope.comFlag=false;
    $scope.add=function(){
        $scope.index=$scope.todo.length;
        var id=$scope.todo[$scope.todo.length-1].id+1;
        var i=$scope.todo.length%7;
        $scope.todo.push({
            id:id,
            color:colors[i],
            title:'新列表'+id,
            list:[]
        });
        localS.savedata($scope.todo);
    };
//  左边的选择列表
    $scope.select=function(i){
        $scope.index=i;
        $scope.Setshow=false;
    };
    $scope.change=function(){
        $scope.Setshow=!$scope.Setshow;
        $scope.cTitle=$scope.todo[$scope.index].title;
        $scope.cColor=$scope.todo[$scope.index].color;
    };
//    点击切换颜色
    $scope.changeColor=function(c){
        $scope.cColor=c;
    };
//  完成按钮
    $scope.done=function () {
        $scope.todo[$scope.index].title=$scope.cTitle;
        $scope.todo[$scope.index].color=$scope.cColor;
        $scope.Setshow=false;
        localS.savedata($scope.todo);
    };
//删除按钮
    $scope.del=function () {
        $scope.todo.splice($scope.index,1);
        $scope.index=0;
        $scope.Setshow=false;
        localS.savedata($scope.todo);
    };
//取消按钮
    $scope.cancel=function () {
        $scope.Setshow=false;
    };
//   查看已完成项
    $scope.changeComFlag=function(){
        $scope.comFlag=!$scope.comFlag;
    };
//  记录已完成条数
    $scope.comNum=function(){
        $scope.num=$filter("filter")($scope.todo[$scope.index].list,{'done':true}).length;
    };
//  选择事件，
    $scope.changestate=function (v,x) {
        v.done=x;
        $scope.comNum();
        localS.savedata($scope.todo);
    };
//  选择当前事件，高亮显示
    $scope.f=false;
    $scope.i=-1;
    $scope.changebg=function (o,i) {
        if(o.done){
            $scope.f=true;
        }else {
            $scope.f=false;
        }
        $scope.i=i;
    };
//  添加新项
    $scope.addlist=function () {
        var o=$scope.todo[$scope.index].list;
        // if($scope.todo[$scope.index].list!=""){
        //     if(o[o.length-1].title!=""){
        //         var obj={title:"",done:false};
        //         $scope.todo[$scope.index].list.push(obj);
        //     }else{
        //         alert("上一项为空，请填写！");
        //         return;
        //     }
        // }else{
            var obj={title:"",done:false};
            $scope.todo[$scope.index].list.push(obj);
        // }
        localS.savedata($scope.todo);
    };
    //清除已完成项
    $scope.deldone=function () {
        var o=$scope.todo[$scope.index].list;
        var n=$filter("filter")(o,{'done':true}).length;
        o.splice(0,n);
        $scope.num=0;
        $scope.comFlag=false;
        localS.savedata($scope.todo);
    };
    //失去焦点保存
    $scope.savedt=function () {
        $localS.savedata($scope.todo)
    };
    $scope.$watch('index',function(){
        $scope.comNum();
    });
});



















