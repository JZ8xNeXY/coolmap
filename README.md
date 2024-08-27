# 名称
熱中症安心サポート

# 概要
「都知事杯 Open Data Hackathon (2024)」のために作成した、三鷹市民向けの熱中症予防対策アプリです。

# URL
https://coolingspotsfinder.com/

# 備考
現在開発中のため、公開準備中のページがあります。

# アプリを開発した背景

### リニューアル前の課題
「都知事杯 Open Data Hackathon (2024)」において、三鷹市より以下の課題が示されました。
- 熱中症の危険度やクーリングシェルターの情報発信
- 気候変動により、熱中症のリスクが年々深刻化している

そこで、位置情報や過去の気象情報、救急搬送に関するオープンデータを活用し、リアルタイムに危険情報を発信する仕組みや、年齢等による危険度判定を行うツールが求められています。また、区市町村では、危険な暑さから避難できる場所をクーリングシェルター（指定暑熱避難施設）として指定し、熱中症特別警戒アラートの発令期間中、一般に開放しています。これらクーリングシェルターの他、類似の暑さを避けられる施設の情報や、施設ごとのウォーターサーバー等の設備情報、混雑度合いなど、利用者に役立つ情報を一元的に発信する仕組みを構築したいと考えています。

# アプリの利用方法
トップ画面から熱中症対策に必要な項目を示しています。熱中症から身を守るため、最新の気象情報と効果的な暑さ対策情報を提供しています。

<img src="https://i.gyazo.com/01a5c24d5b8690fde58f3b6b1c2c2744.jpg" width="500">

# 機能①　外でできる暑さ対策　最寄りの休憩所やドリンキングステーションを探す
<img src="https://i.gyazo.com/a5abf67fdacde1bf8546a7400697cea4.jpg" width="500">

# 機能②　現在の熱中症の危険度や熱中症警戒アラート情報を表示する
<img src="https://i.gyazo.com/d319b57d0d73a8240fba30efcd515b49.jpg" width="500">

# 機能③　今日の天気や気温を表示する
<img src="https://i.gyazo.com/3ed5446d543442c4262a1d5cec60f188.png" width="500">


# 主な使用技術
| カテゴリー      | 使用技術                                      |
|-----------------|-----------------------------------------------|
| フロントエンド  | React 18.3.1<br>Next.js 14.2.3<br>TypeScript 5.4.5  |
| バックエンド DB   | Supabase |
| インフラ        | Vercel                                  |
| 開発環境        | Docker                                        |
| API             | GoogleMapsAPI                                 |

その他の使用技術
- [環境省_熱中症予防情報サイト](https://www.wbgt.env.go.jp/wbgt_data.php)より暑さ指数情報を取得しています。
- [気象庁_全国の天気予報](https://www.jma.go.jp/bosai/forecast/)より天気情報を取得しています。

# 技術選定理由

### フロントエンド（Next)
コンポーネント化により、コードの再利用と保守がしやすくなりました。各UI要素を独立した部品として分けることで、複数のファイルを同時に作業しやすくなり、新機能を追加する際の手間が減りました。また、Reactを使うことで、JavaScriptよりもシンプルにコードを書くことができ、開発がスムーズになりました。

### バックエンド（Supabase）
- コスト効率: オープンソースで基本機能が無料のため、運用コストを大幅に削減できます。
- リアルタイムデータベース: PostgreSQLベースのリアルタイムデータベースを提供し、即時性の高いアプリケーションが構築可能です。
- 簡単なセットアップと統合: バックエンドのセットアップが簡単で、フロントエンドとの連携がシンプルです。

### API（Google Maps)
マップ機能にはGoogle Maps APIを利用しました。これにより、高精度な地図データを提供し、ユーザーがトイレの場所を簡単に見つけられるようにしました。

### 開発環境(Docker)
開発環境の一貫性を保つためにDockerを使用しました。Docker Composeを使うことで、複数のコンテナを簡単に管理し、開発環境と本番環境を同じ設定にすることができます。これにより、環境設定の手間が省け、開発者が効率的に作業できるようになりました。

### インフラ
<img src="https://i.gyazo.com/4ba2567fcb081a3ee54040ae46dea093.png" width="500">

# 機能要件
- 熱中症対策に必要な情報を一元的に表示
- 天気や気温の情報を表示
- 熱中症の危険度や熱中症警戒アラート情報を表示
- マップ上に市内の休憩所を表示
- マップ上に市内のドリンキングステーションを表示
- 現在地情報を表示
- 休憩所やドリンキングステーションの施設情報を表示
- レスポンシブ対応: スマートフォンやタブレットなど、様々なデバイスでの利用に対応
- 独自ドメイン、HTTPS化: セキュリティと信頼性の向上

# 工夫したポイント
1. 暑さ対策に関する情報を一元的に集約。特に暑さ指数や熱中症のリアルタイムな危険情報（府中地点）を表示。
2. 市内の休憩所情報をマップに表示。GPS機能を使用して最寄りの場所までのルートを表示。
3. 低コストで作成したこと。また省メンテナンスで運用可能なこと。

# 参考にしたもの
- [都知事杯 Open Data Hackathon (2024)](https://odhackathon.metro.tokyo.lg.jp/issues/)
- [三鷹市公式サイト](https://www.city.mitaka.lg.jp/c_service/109/109182.html)
- [東京都オープンデータカタログ](https://catalog.data.metro.tokyo.lg.jp/dataset/t000019d0000000003)