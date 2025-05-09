export const ITEM_PER_PAGE = 10

type RouteAccessMap = {
    [key: string]: string[];
  };
  
export const routeAccessMap: RouteAccessMap = {
    "/admin(.*)": ["admin"],
    "/student(.*)": ["student"],
    "/teacher(.*)": ["teacher"],
    "/parent(.*)": ["parent"],
    "/list/teachers": ["admin"],
    "/list/students": ["admin"],
    "/list/parents": ["admin"],
    "/list/subjects": ["admin"],
    "/list/classes": ["admin"],
    "/list/attendance": ["admin", "teacher", "student", "parent"],
};