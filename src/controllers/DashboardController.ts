import { Request, Response } from "express";

export class DashboardController {
    static carregarDashboard(req: Request, res: Response) {
        res.render('pages/dashboard', 
            { 
                titulo: 'Dashboard',
            });
    }
}

