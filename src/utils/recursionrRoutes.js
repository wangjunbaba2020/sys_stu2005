//根据服务器用户返回的menuList数据和allRoutes进行匹配，得到符合当前用户的有效路由配置。

/**
 * 
 * @param {Array} allRoutes 用户的有效的完整路由配置
 * @param {Array} menuList  服务器返回的用户菜单名字
 */

import allRoutes from "../router/allRoutes"

const recursionRoutes = (allRoutes, menuList) => {
    //新数组
    let userRoutes = []

    allRoutes.forEach(item => { //item是最外的
        menuList.forEach(v => { //v是服务器返回的对象
            if (item.meta.name === v.name) {
                if (v.children && Array.isArray(v.children)) { //如果有children并且有内容  v.children.length>0
                    //递归
                    item.children = recursionRoutes(item.children, v.children)
                }
                //先判断有没有孩子在判断name，然后推进新数组里

                userRoutes.push(item)
            }
        })
    })
    return userRoutes
}


let menuList = [{
            "name": "管理首页"
        },
        {
            "name": "学员管理",
            "children": [{
                    "name": "学员项目管理"
                },
                {
                    "name": "学员资料"
                },
                {
                    "name": "学员宿舍"
                }
            ]
        },
        {
            "name": "考勤管理"
        },
        {
            "name": "数据统计"
        },
        {
            "name": "我的中心"
        }
    ]
    // console.log(recursionRoutes(allRoutes, menuList));

export default recursionRoutes