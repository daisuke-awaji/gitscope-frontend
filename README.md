# dahsboard layout for react

![image](https://user-images.githubusercontent.com/20736455/111234653-5e173c80-8632-11eb-8572-e31958c3d368.png)

![Vercel](https://vercelbadge.vercel.app/api/daisuke-awaji/dashboard-layout)

# generate frontend api client

```
docker run --rm -v $(pwd):/local openapitools/openapi-generator-cli generate -i /local/spec.yaml -g typescript-axios -o /src/axios/petstore
```

# feature

- コミット数の推移
- PullRequest が作成されてからマージされるまでの時間間隔の推移

  - 作成者ごと

- ソースコード変更量（additions + deleteions）に対するコメントの数
