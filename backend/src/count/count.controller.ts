import { Controller, Get, Res } from "@nestjs/common";
import { CountService } from "./count.service";

@Controller("count")
export class CountController {
  constructor(private readonly countService: CountService) {}

  @Get()
  async find(@Res() res) {
    try {
      const data = await this.countService.fetchOperationCount();
      return res.json({ data });
    } catch (err: any) {
      return res
        .status(500)
        .json({ message: err?.message || "Internal Error" });
    }
  }
}
