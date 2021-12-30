import classes from './MagicPage.module.css'

const ProtoMagicPage = () => (
    <div class={classes.magicPage}>
        <div class={classes.magicPageElements}>
            No elements so far
        </div>
        <div class={classes.magicPageAddElements}>
            <form onSubmit={() => {
                // implement
            }}>
                <input id="newElement" type="text" class="sharedClasses.text" />
                <button class="sharedClasses.button">Add element</button>
            </form>
        </div>
    </div>
);

export const MagicPage = ProtoMagicPage;