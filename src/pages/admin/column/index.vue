<template>
    <div class="page">
        <el-tree :data="data" node-key="id" :props="defaultProps" @node-click="handleNodeClick">
            <span class="custom-tree-node" slot-scope="{ node, data }">
                <span>{{ node.label }}</span>
                <span>
                  <el-button
                          type="text"
                          size="mini"
                          @click="() => append(data)">
                    Append
                  </el-button>
                  <el-button
                          type="text"
                          size="mini"
                          @click="() => remove(node, data)">
                    Delete
                  </el-button>
                </span>
              </span>
        </el-tree>
    </div>
</template>

<script>
    import Vue from 'vue';
    import { Tree,Button } from 'element-ui';
    Vue.use(Tree);
    Vue.use(Button);
    let id = 1000;
    export default {
        data() {
            return {
                data: [{
                    label: '一级 1',
                    children: [{
                        label: '二级 1-1',
                        children: [{
                            label: '三级 1-1-1'
                        }]
                    }]
                }, {
                    label: '一级 2',
                    children: [{
                        label: '二级 2-1',
                        children: [{
                            label: '三级 2-1-1'
                        }]
                    }, {
                        label: '二级 2-2',
                        children: [{
                            label: '三级 2-2-1'
                        }]
                    }]
                }, {
                    label: '一级 3',
                    children: [{
                        label: '二级 3-1',
                        children: [{
                            label: '三级 3-1-1'
                        }]
                    }, {
                        label: '二级 3-2',
                        children: [{
                            label: '三级 3-2-1'
                        }]
                    }]
                }],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                }
            };
        },
        methods: {
            handleNodeClick(data) {
                console.log(JSON.stringify(data));
            },
            append(data) {
                const newChild = { id: id++, label: 'testtest', children: [] };
                if (!data.children) {
                    this.$set(data, 'children', []);
                }
                data.children.push(newChild);
            },

            remove(node, data) {
                const parent = node.parent;
                const children = parent.data.children || parent.data;
                const index = children.findIndex(d => d.id === data.id);
                children.splice(index, 1);
            },
        }
    }
</script>

<style scoped>
    .page{
        width:95%;
        min-height:86vh;
        background-color:#FFFFFF;
        border:1px solid #CCCCCC;
        margin:0 auto;
        font-size:14px;
    }
</style>
