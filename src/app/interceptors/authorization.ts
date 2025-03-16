import { HttpInterceptorFn } from '@angular/common/http';
export const Authorization: HttpInterceptorFn = (req, next) => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token')
    const newReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
    })
    return next(newReq)
};
