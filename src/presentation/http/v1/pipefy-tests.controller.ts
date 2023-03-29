import { PipefyInfraService } from '@infra/pipefy.service';
import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';

@Controller({
  version: '1',
  path: 'pipefy/tests',
})
export class PipefyTestsController {
  constructor(private readonly pipefyService: PipefyInfraService) {}

  @Get('allcards')
  async getAllCards() {
    return await this.pipefyService.getAllCards();
  }

  @Get(':id')
  async getCard(@Param('id') id: number) {
    return await this.pipefyService.getCard(id);
  }

  @Put('move/:id/from/:target')
  async moveCard(@Param('id') id: number, @Param('target') target: number) {
    return await this.pipefyService.moveCard({
      card: id,
      target,
    });
  }

  @Post('updateFields/:id')
  async updateFields(@Param('id') cardId: number, @Body() input) {
    return await this.pipefyService.updateEnergisaCardFields({
      cardId,
      codigoCredor: input.codigoCredor,
      nomeCredor: input.nomeCredor,
      numeroContratos: input.numeroContratos,
      tipoContrato: input.tipoContrato,
    });
  }
}
