import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FeeModule } from './Fees/fee.module';
import { PriceStxModule } from './Price/stx-btc-price/stx.module';
import { BtcPriceModule } from './Price/btc-price/btc-price.module';
import { InfoModule } from './Info/info.module';
import { SignUrlModule } from './Sign-Url/sign-url.module';
import { checkTestnet } from './utils/helpers';
import { NftDetailModule } from './NFT/nft-details/nft-details.module';
import { NftCollectionModule } from './NFT/nft-collections/nft-collection.module';
import { EthModule } from './Ethereum/eth.module';
import { OrdinalCollectionModule } from './Address/Ordinals-collections/ordinals-collections.module';
import { OrdinalInscriptionModule } from './Address/Ordinals-Inscriptions/ordinals-inscriptions.module';
import { OrdinalAddressUtxoModule } from './Address/Ordinal-Utxo/ordinal-utxo.module';
import { AppConfigModule } from './App-Config/app-config.module';
import { InscriptionContentModule } from './Inscription-Content/inscription-content.module';
import { OrdinalUtxoModule } from './Ordinal-Utxo/ordinal-utxo.module';
import { Brc20TokenBalanceModule } from './Brc20/brc20-token-balance.module';
import { BtcNameResolveModule } from './Btc-Name/btc-name-resolve.module';
import { ImagesModule } from './Images/images.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    FeeModule,
    PriceStxModule,
    BtcPriceModule,
    InfoModule,
    SignUrlModule,
    NftDetailModule,
    NftCollectionModule,
    EthModule,
    OrdinalCollectionModule, //Address
    OrdinalInscriptionModule, //Address
    OrdinalAddressUtxoModule, //Address
    AppConfigModule,
    InscriptionContentModule,
    OrdinalUtxoModule,
    Brc20TokenBalanceModule,
    BtcNameResolveModule,
    ImagesModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(checkTestnet).forRoutes('*');
  }
}
